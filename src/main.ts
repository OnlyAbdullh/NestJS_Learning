import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
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
  /*  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // remove unexpected properties
        forbidNonWhitelisted: true, // throw error if extra properties exist
        transform: true, // auto-transform types to match DTO
      }),
    );*/
  app.useGlobalPipes(new ZodValidationPipe());
  //app.use(logger); using global middleware
  await app.listen(3000);
}

bootstrap();
