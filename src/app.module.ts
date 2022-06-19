import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { WikisModule } from './wikis/wikis.module';

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
    WikisModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
