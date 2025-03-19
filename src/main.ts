import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: () => {
        throw new Error('Failed to connect to database');
      },
    },
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);
}

bootstrap();
