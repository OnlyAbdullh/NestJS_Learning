import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UppercasePipe } from '../pipes/validation.pipe';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { BusinessGuard } from '../../guards/business.guard';
import { AuthMetaData } from '../../Decorators/auth.metadata.decorator';

@Controller('users')
@UseGuards(AuthGuard, BusinessGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @AuthMetaData('SkipAuthorizationCheck')
  @Get('hey')
  sayHello(@Query('name', UppercasePipe) name: string) {
    return `Hello, ${name}!`;
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    await this.usersService.create(dto);
    return { message: 'User registered successfully' };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
