import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import type { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DiscordService {
  constructor(private readonly httpService: HttpService) {}

  getWebhook(url: string): Observable<AxiosResponse<DiscordWebhook>> {
    return this.httpService.get(url).pipe(
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      })
    );
  }
}

export enum DiscordWebhookType {
  INCOMING_WEBHOOK = 1,
  CHANNEL_FOLLOWER = 2,
  APPLICATION_WEBHOOK = 3
}

export interface DiscordWebhook {
  id: string;
  type: DiscordWebhookType;
  guild_id?: string;
  channel_id?: string;
  name?: string;
  avatar?: string;
  token?: string;
  application_id?: string;
}
