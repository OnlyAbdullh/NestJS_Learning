// signin.dto.ts
import { createZodDto } from 'nestjs-zod';
import { SignInSchema } from './signin.schema';

export class SignInDto extends createZodDto(SignInSchema) {}
