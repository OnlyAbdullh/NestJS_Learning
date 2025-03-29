import {
  Controller,
  Post,
  Get,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @HttpCode(201)
  @Header('Cache-Control', 'no-store')
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @HttpCode(200)
  @Get('find/*') //any path after the find word is works.
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    } else if (version === '6') {
      return { url: 'https://docs.nestjs.com/v6/' };
    }
  }

  @Get(':id/:type')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('type') type: string,
  ): string {
    console.log(`ID: ${id}, Type: ${type}`);
    return `Cat ID: ${id}, Type: ${type}`;
  }
}
