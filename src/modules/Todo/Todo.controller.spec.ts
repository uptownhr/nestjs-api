import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './Todo.controller';
import { TodoService } from './Todo.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Todo } from './Todo.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('TodoController', () => {
  let appController: TodoController;

  beforeAll(async () => {
    const mongod = new MongoMemoryServer({
      binary: {
        version: '3.6.12',
      },
    });

    const DB_URI = await mongod.getConnectionString();

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forFeature([Todo]),
        TypegooseModule.forRoot(DB_URI, {
          useNewUrlParser: true,
        }),
      ],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    appController = app.get<TodoController>(TodoController);
  }, 20000);

  describe('create', () => {
    it('should create a Todo', async () => {
      const todo = {
        name: 'did you get this?',
      };

      const res = await appController.create(todo);

      expect(res.name).toBe(todo.name);
    });
  });

  describe('getTodos', () => {
    it('should return Todos', async () => {
      const todo = {
        name: 'did you get this?',
      };

      const res = await appController.getTodos();

      expect(res.length).toBeGreaterThan(0);
    });
  });
});
