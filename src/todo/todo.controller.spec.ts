import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

const testTodo = {
  id: '5',
  task: 'Test Todo service',
  completed: false,
};
const testTodoUpdated = {
  id: '5',
  completed: true,
};

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoController,
        {
          provide: TodoService,
          // using a factory just because
          useFactory: () => ({
            create: jest.fn(() => testTodo),
            findAll: jest.fn(() => [testTodo]),
            findOne: jest.fn(() => testTodo),
            update: jest
              .fn(() => testTodoUpdated)
              .mockReturnValue(testTodoUpdated),
            remove: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new todo', async () => {
    expect(await controller.create(testTodo)).toEqual(testTodo);
  });

  it('should get the todos', async () => {
    expect(await controller.findAll()).toEqual([testTodo]);
  });

  it('should find a todo', async () => {
    expect(await controller.findOne(testTodo.id)).toEqual(testTodo);
  });

  it('should update the todo', async () => {
    const todo = await controller.update(
      testTodo.id,
      testTodo as unknown as UpdateTodoDto,
    );
    expect(todo).toEqual(testTodoUpdated);
  });

  it('should remove the todo', async () => {
    await controller.remove('999');
  });
});
