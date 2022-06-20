import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { firstValueFrom } from 'rxjs';

import { Webhook } from './webhook.model';
import { Wiki } from './wiki.model';
import { CreateWebhookDto } from './create-webhook.dto';
import { CreateWikiDto } from './create-wiki.dto';

import { DiscordService } from 'src/discord/discord.service';
import { WikiActivityService } from 'src/wikiactivity/wikiactivity.service';

@Injectable()
export class WikisService {
  constructor(
    @InjectModel(Wiki)
    private readonly wikiModel: typeof Wiki,

    @InjectModel(Webhook)
    private readonly webhookModel: typeof Webhook,

    private readonly discordService: DiscordService,

    @Inject(forwardRef(() => WikiActivityService))
    private readonly wikiActivityService: WikiActivityService
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
    const wiki = await this.wikiModel.create({ ...dto });
    this.wikiActivityService.subscribeToWiki(wiki.interwiki);
    return wiki;
  }

  async remove(id: number): Promise<void> {
    await this.wikiModel.destroy({ where: { id } });
  }

  async createWebhook(wikiId: number, dto: CreateWebhookDto) {
    const wiki = await this.findOne(wikiId);

    try {
      await firstValueFrom(this.discordService.getWebhook(dto.url));
    } catch (err) {
      // TODO: log this
      console.error('Error from Discord', err);
      throw new BadRequestException('Invalid webhook URL');
    }

    return this.webhookModel.create({
      ...dto,
      wikiId: wiki.id
    });
  }
}
