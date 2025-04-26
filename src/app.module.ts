import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounterService } from './tests/counter.service';
import { CatsModule } from './Cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './Cats/entities/cat.entity';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // استخدم false في بيئة الإنتاج
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CounterService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const dbUser = this.configService.get<string>('DATABASE_USER');
    console.log('username:', dbUser);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); //apply method can take multiple arguments to specify multiple middlewares.
    //.forRoutes({ path: 'cats', method: RequestMethod.GET });
    //.forRoutes({ path: 'abc/{*splat}', method: RequestMethod.ALL,});
    //.forRoutes(CatsController);
  }
}
