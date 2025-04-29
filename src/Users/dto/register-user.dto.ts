import { createZodDto } from '@anatine/zod-nestjs';
import { RegisterUserSchema } from 'src/Users/schemas/user.schema';

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
