import { IsEnum, IsNotEmpty } from 'class-validator';
import { WebhookPlatform } from './webhook.model';

export class CreateWebhookDto {
  @IsEnum(WebhookPlatform)
  platform: WebhookPlatform;

  @IsNotEmpty()
  url: string;

  secret?: string;
}
