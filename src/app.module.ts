import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './Cats/cats.module';
import { CounterService } from './tests/counter.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService, CounterService],
})
export class AppModule {}
