import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

const testTodo = {
  id: 5,
  task: 'Test Todo service',
  completed: false,
};
const testTodoUpdated = {
  id: 5,
  task: 'Test Todo service',
  completed: false,
};

describe('TodoService', () => {
  let service: TodoService;
  let model: typeof Todo;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo),
          useValue: {
            create: jest.fn(() => testTodo),
            findAll: jest.fn(() => [testTodo]),
            findOne: jest.fn(() => testTodo),
            update: jest.fn(() => testTodoUpdated),
            destroy: jest.fn(() => null),
          },
        },
      ],
    }).compile();
    service = modRef.get(TodoService);
    model = modRef.get<typeof Todo>(getModelToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const result = await service.create({
        task: testTodo.task,
        completed: testTodo.completed,
      });
      expect(result).toEqual(testTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = await service.findAll();
      expect(result).toEqual([testTodo]);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(testTodo);
    });
    it('should throw an error', () => {
      model.findOne = jest.fn(() => null);
      expect(service.findOne(999)).rejects.toThrow(
        'Todo with ID 999 not found',
      );
    });
    it('should get a single todo', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne(testTodo.id));
      expect(findSpy).toHaveBeenCalledWith({ where: { id: testTodo.id } });
    });

    describe('update', () => {
      it('should update a todo', async () => {
        const updateSpy = jest.spyOn(model, 'update');
        const result = await service.update(testTodo.id, testTodoUpdated);
        expect(result).toEqual(testTodoUpdated);
        expect(updateSpy).toHaveBeenCalledWith(testTodoUpdated, {
          where: { id: testTodo.id },
        });
      });
    });

    describe('remove', () => {
      it('should remove a todo', async () => {
        const destroySpy = jest.spyOn(model, 'destroy');
        await service.remove(testTodo.id);
        expect(destroySpy).toHaveBeenCalledWith({ where: { id: testTodo.id } });
      });
    });
  });
});
