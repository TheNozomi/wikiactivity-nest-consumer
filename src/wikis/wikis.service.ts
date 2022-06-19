import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Wiki } from './wiki.model';
import { CreateWikiDto } from './create-wiki.dto';

@Injectable()
export class WikisService {
  constructor(
    @InjectModel(Wiki)
    private readonly wikiModel: typeof Wiki
  ) {}

  async findAll(): Promise<Wiki[]> {
    return await this.wikiModel.findAll();
  }

  async findOne(id: number): Promise<Wiki> {
    const wiki = await this.wikiModel.findByPk(id);

    if (!wiki) {
      throw new NotFoundException(`Wiki with id ${id} not found`);
    }

    return wiki;
  }

  async create(dto: CreateWikiDto): Promise<Wiki> {
    return await this.wikiModel.create(dto as any);
  }

  async remove(id: number): Promise<void> {
    await this.wikiModel.destroy({ where: { id } });
  }
}
