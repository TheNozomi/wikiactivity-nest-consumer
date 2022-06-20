import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { Webhook } from './webhook.model';

@Table({
  tableName: 'wiki'
})
export class Wiki extends Model {
  @Column({ allowNull: false })
  interwiki: string;

  @HasMany(() => Webhook)
  webhooks: Webhook[];

  @Column({ defaultValue: true })
  isActive: boolean;
}
