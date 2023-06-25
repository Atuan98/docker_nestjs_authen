import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file'
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './all.exeptions.filter';

transports.DailyRotateFile = require('winston-daily-rotate-file')

const timzoned = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh'
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          // %DATE will be replaced by the current date
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp({format: timzoned}), format.prettyPrint()),
          datePattern: 'YYYY-MM-DD',
          maxSize: '10mb',
          zippedArchive: false, // don't want to zip our logs
          maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp({format: timzoned}), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '10mb',
          maxFiles: '30d',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp({format: timzoned}),
            format.simple(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ]
    })
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('The API description for authentication')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  process.env.TZ = "Asia/Ho_Chi_Minh";
  await app.listen(3000);
}
bootstrap();
