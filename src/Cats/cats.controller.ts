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
  Body,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /*  catsService: CatsService;
  constructor(catsService: CatsService) {
    this.catsService = catsService;
  }*/

  @HttpCode(201)
  @Header('Cache-Control', 'no-store')
  @Post('/add')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @HttpCode(200)
  @Get('find/*') //any path after the find word is works.
  findAllbyQuery(
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): string {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
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
