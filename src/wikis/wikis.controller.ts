import { Controller, Get } from '@nestjs/common';

@Controller('wikis')
export class WikisController {
  @Get()
  findAll() {
    return { wikis: [] };
  }
}
