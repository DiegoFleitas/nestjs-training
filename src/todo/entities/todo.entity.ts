import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'todos',
  paranoid: true, // soft-delete
  underscored: true,
  timestamps: true,
})
export class Todo extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column
  task: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
