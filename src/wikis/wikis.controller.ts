import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';

import { WikisService } from './wikis.service';
import { CreateWikiDto } from './create-wiki.dto';

@Controller('wikis')
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

  @Get()
  async findAll() {
    return this.wikisService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wikisService.findOne(id);
  }

  @Post()
  async create(@Body() createWikiDto: CreateWikiDto) {
    return await this.wikisService.create(createWikiDto);
  }
}
