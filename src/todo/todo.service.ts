import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Todo } from './todo.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo) private readonly TodoModel: ReturnModelType<typeof Todo>,
  ) {}

  async create(createTodoDto: Todo): Promise<Todo> {
    const createdTodo = new this.TodoModel(createTodoDto);

    return await createdTodo.save();
  }

  async findAll(): Promise<Todo[] | null> {
    return await this.TodoModel.find().exec();
  }
}

export { Todo };
