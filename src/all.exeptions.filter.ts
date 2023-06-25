import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new Logger();
    catch(exception: any, host: ArgumentsHost) {
        super.catch(exception, host);
        this.logger.error(exception)
    }
}