import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import {
  InjectIoClientProvider,
  IoClient,
  OnConnect,
  OnConnectError,
  EventListener
} from 'nestjs-io-client';

import { WikisService } from 'src/wikis/wikis.service';

@Injectable()
export class WikiActivityService {
  private readonly logger = new Logger(WikiActivityService.name);

  constructor(
    @InjectIoClientProvider()
    private readonly io: IoClient,

    @Inject(forwardRef(() => WikisService))
    private readonly wikisService: WikisService
  ) {}

  @OnConnect()
  async connect() {
    this.logger.log(`Connected to ws-wikiactivity - Connection: ${this.io.id}`);
    const wikis = await this.wikisService.findAll(),
      interwikis = wikis.map((wiki) => wiki.interwiki);
    this.logger.log(`Subscribing to wikis: ${interwikis}`);
    this.io.send('join', interwikis);
  }

  @OnConnectError()
  connectError(err: Error) {
    this.logger.error(`An error occurred: ${err}`);
  }

  @EventListener('activity')
  message(data: any) {
    console.log(data);
  }

  subscribeToWiki(interwiki: string) {
    this.logger.log(`Subscribing to wiki: ${interwiki}`);
    this.io.send('join', [interwiki]);
  }
}
