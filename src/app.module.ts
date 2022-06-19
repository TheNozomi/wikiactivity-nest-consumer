import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikisController } from './wikis/wikis.controller';

@Module({
  imports: [],
  controllers: [AppController, WikisController],
  providers: [AppService],
})
export class AppModule {}
