import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoRepository: typeof Todo,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.create(
      createTodoDto as Omit<CreateTodoDto, 'id'>,
    );
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  findOne(id: number): Promise<Todo> {
    const todo = this.todoRepository.findOne({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const condition = {
      where: { id },
    };
    await this.todoRepository.update(updateTodoDto, condition);
    const todo = await this.todoRepository.findOne(condition);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.destroy({
      where: {
        id,
      },
    });
  }
}
