import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async onModuleInit() {
    await this.redis.set('initialized', 'true');
    console.log('Redis service initialized');
  }

  async set(key: string, value) {
    await this.redis.set(key, JSON.stringify(value), 'EX', 60);
  }

  async get(key: string) {
    return JSON.parse(await this.redis.get(key));
  }
}
