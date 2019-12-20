import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService, Todo } from './Todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly TodosService: TodoService) {}

  @Get()
  async getTodos(): Promise<Todo[] | null> {
    return await this.TodosService.findAll();
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return await this.TodosService.create(todo);
  }
}
