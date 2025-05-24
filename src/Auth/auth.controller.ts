// auth.controller.ts
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() body: SignInDto) {
    this.logger.log('Received login request');
    this.logger.log(`Data type received: ${typeof body}`);
    this.logger.log(`Data received: ${JSON.stringify(body)}`);

    // If body is undefined, use raw data from request
    if (!body) {
      this.logger.error('Body is undefined! Using raw data from request');
      return { error: 'Failed to receive data' };
    }

    return this.authService.signIn(body.username, body.password);
  }
}
