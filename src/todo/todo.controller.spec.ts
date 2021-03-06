import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Todo } from './todo.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('TodoController', () => {
  let app: TestingModule;
  let appController: TodoController;

  beforeAll(async () => {
    const mongod = new MongoMemoryServer({
      binary: {
        version: '3.6.12',
      },
    });

    const DB_URI = await mongod.getConnectionString();

    app = await Test.createTestingModule({
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
    it('should create a todo', async () => {
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

  afterAll( async () => {
    await app.close();
  });
});
