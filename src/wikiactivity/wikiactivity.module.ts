import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IoClientModule } from 'nestjs-io-client';

import { WikisModule } from 'src/wikis/wikis.module';
import { WikiActivityService } from './wikiactivity.service';

@Module({
  imports: [
    IoClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('WS_ENDPOINT'),
        options: {
          reconnectionDelayMax: 10000
        }
      })
    }),
    forwardRef(() => WikisModule)
  ],
  exports: [WikiActivityService],
  providers: [WikiActivityService]
})
export class WikiActivityModule {}
