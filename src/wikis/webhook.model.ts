import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';

import { Wiki } from './wiki.model';

export enum WebhookPlatform {
  DISCORD = 'discord'
}

@Table({
  tableName: 'webhook'
})
export class Webhook extends Model {
  @ForeignKey(() => Wiki)
  @Column({ allowNull: false })
  wikiId: number;

  @BelongsTo(() => Wiki)
  wiki: Wiki;

  @Column({
    allowNull: false,
    type: DataType.ENUM({ values: Object.keys(WebhookPlatform) })
  })
  platform: WebhookPlatform;

  @Column({ allowNull: false })
  url: string;

  @Column
  secret: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
