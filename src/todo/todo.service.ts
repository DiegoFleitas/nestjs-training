import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ValidationError } from 'sequelize';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoRepository: typeof Todo,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const newTodo = await this.todoRepository.create(
        createTodoDto as Omit<CreateTodoDto, 'id'>,
      );
      return newTodo;
    } catch (error) {
      if (error instanceof ValidationError) {
        const todoMessage = error.message;
        const todoError = error.errors.find((err) => err.path === 'task');
        const humanizedMessage = todoMessage?.replace(
          '{{value}}',
          todoError?.value || '',
        );
        throw new BadRequestException(humanizedMessage || 'Bad request');
      }
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
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
