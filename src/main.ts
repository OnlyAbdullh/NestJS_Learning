import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Module } from '@nestjs/common';

/*@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: () => {
        throw new Error('Failed to connect to database');
      },
    },
  ],
})*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);
}

bootstrap();
