// dto/register-user.dto.ts
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Age must be at least 18' })
  age?: number;
}
