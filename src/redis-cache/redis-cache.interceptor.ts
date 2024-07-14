import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Logger,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { RedisCacheService } from './redis-cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  @Inject() redisService: RedisCacheService;

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('interceptor call');
    const request = context.switchToHttp().getRequest();
    const key = request.path;
    console.log('key', key);
    const data = await this.redisService.get(key);
    if (data) {
      Logger.log('from cache', data);
      return of(data);
    }
    Logger.log('from db');
    return next.handle().pipe(
      tap((value) => {
        console.log('value', value);
        if (value) {
          this.redisService.set(key, value);
        }
      }),
    );
  }
}
