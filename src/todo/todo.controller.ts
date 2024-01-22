import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  // ApiInternalServerErrorResponse,
  // ApiNoContentResponse,
  // ApiNotFoundResponse,
  // ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationError } from 'sequelize';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    summary: 'Add todos to the app database',
  })
  @ApiBadRequestResponse({
    description: 'A todo with task "{{value}}" already exists',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto).catch((error) => {
      if (error instanceof ValidationError) {
        const todoMessage = error.message;
        const todoError = error.errors.find((err) => err.path === 'task');
        const humanizedMessage = todoMessage?.replace(
          '{{value}}',
          todoError?.value || '',
        );
        throw new BadRequestException(humanizedMessage || 'Bad request');
      }
    });
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
