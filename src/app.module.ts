import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './helper/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './helper/http-exception.filter';
import { LoggerMiddleware } from './helper/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { configuration, EConfiguration } from './config/configuration.config';
import { validate } from './helper/env.validation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(EConfiguration.DB_MYSQL_HOST),
        port: +configService.get<number>(EConfiguration.DB_MYSQL_PORT),
        username: configService.get(EConfiguration.DB_MYSQL_USER),
        password: configService.get(EConfiguration.DB_MYSQL_PASSWORD),
        database: configService.get(EConfiguration.DB_MYSQL_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        // logger: new DatabaseMysqlLogger(),
        timezone: '+09:00',
        legacySpatialSupport: false, //fix version mysql 8
      }),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
