import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
