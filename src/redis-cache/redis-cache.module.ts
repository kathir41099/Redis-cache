import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import Redis from 'ioredis';

@Module({
  controllers: [RedisCacheController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
          db: 1,
          password:
            'eB3tuHxJOK7SfOgtnyIiDe3N6yiX82Xc6U3Xe0PbHCUsV5WyOwiFnJBZo9YNbDkdBIaYCE5ibizB5b75',
          connectTimeout: 10000,
        });
      },
    },
    RedisCacheService,
  ],
})
export class RedisCacheModule {}
