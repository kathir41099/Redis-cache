import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CacheInterceptor } from './redis-cache.interceptor';

@Controller('redis-cache')
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) {}
  @Post('set-value')
  async setValue(@Query('key') key: string, @Query('value') value: string) {
    await this.redisCacheService.set(key, value);
    return 'Value set';
  }

  @UseInterceptors(CacheInterceptor)
  @Get('get-value')
  async getValue(@Query('key') key: string) {
    const value = await this.redisCacheService.get(key);
    return `Value: ${value}`;
  }
}
