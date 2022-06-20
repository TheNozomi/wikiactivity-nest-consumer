import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { WikiActivityModule } from './wikiactivity/wikiactivity.module';
import { WikisModule } from './wikis/wikis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordService } from './discord/discord.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true
      })
    }),
    WikisModule,
    WikiActivityModule
  ],
  controllers: [AppController],
  providers: [AppService, DiscordService]
})
export class AppModule {}
