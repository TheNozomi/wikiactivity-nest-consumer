import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Wiki } from './wiki.model';
import { WikisController } from './wikis.controller';
import { WikisService } from './wikis.service';

@Module({
  controllers: [WikisController],
  imports: [SequelizeModule.forFeature([Wiki])],
  providers: [WikisService]
})
export class WikisModule {}
