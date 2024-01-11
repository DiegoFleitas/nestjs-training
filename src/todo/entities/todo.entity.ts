import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'todos',
  paranoid: true, // soft-delete
  underscored: true,
  timestamps: true,
})
export class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @Column
  task: string;

  @Default(false)
  @Column
  completed: boolean;
}
