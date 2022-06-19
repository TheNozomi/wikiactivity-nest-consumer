import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'wiki'
})
export class Wiki extends Model {
  @Column({ allowNull: false })
  interwiki: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
