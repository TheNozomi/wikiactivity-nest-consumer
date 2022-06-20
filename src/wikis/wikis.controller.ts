import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';

import { WikisService } from './wikis.service';

import { CreateWebhookDto } from './create-webhook.dto';
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

  @Post('/:id/webhooks')
  async createWebhook(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWebhookDto: CreateWebhookDto
  ) {
    return await this.wikisService.createWebhook(id, createWebhookDto);
  }
}
