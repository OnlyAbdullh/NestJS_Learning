import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CounterService } from './tests/counter.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly counterService: CounterService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('counter')
  getCount(): number {
    return this.counterService.increment();
  }
}
