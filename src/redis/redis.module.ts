import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisController } from './redis.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const envConfig = dotenv.parse(fs.readFileSync('.env'))

@Module({
  imports: [
    RedisModule.forRoot({
      config: { 
        url: envConfig.REDIS_URL,
      },
    }),
  ],
  controllers: [RedisController],
})
export class ModuleRedis {}