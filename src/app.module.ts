import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WikisModule } from './wikis/wikis.module';
import { DiscordService } from './discord/discord.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true
    }),
    HttpModule,
    WikisModule
  ],
  controllers: [AppController],
  providers: [AppService, DiscordService]
})
export class AppModule {}
