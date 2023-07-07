import { Controller, Get, } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('redis')
@Controller('redis')
export class RedisController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get('set')
  async set() {
    await this.redis.set('key', 'Redis data!');
    await this.redis.expire('key', 20)
    // const redisData = await this.redis.get("key");
    // const redisData = await this.redis.get("key");
    return 'ok';
  }

  @Get('get')
  async get() {
    // await this.redis.set('key', 'Redis data!');
    // await this.redis.expire('key', 10)
    // const redisData = await this.redis.get("key");
    const redisData = await this.redis.get("key");
    console.log(redisData)
    return redisData;
  }
}