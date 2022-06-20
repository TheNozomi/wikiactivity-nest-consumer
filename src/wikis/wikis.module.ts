import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { Wiki } from './wiki.model';
import { Webhook } from './webhook.model';
import { WikisController } from './wikis.controller';
import { WikisService } from './wikis.service';
import { DiscordService } from 'src/discord/discord.service';

import { WikiActivityModule } from 'src/wikiactivity/wikiactivity.module';

@Module({
  controllers: [WikisController],
  imports: [
    SequelizeModule.forFeature([Wiki, Webhook]),
    HttpModule,
    forwardRef(() => WikiActivityModule)
  ],
  exports: [WikisService],
  providers: [WikisService, DiscordService]
})
export class WikisModule {}
