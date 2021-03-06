import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TodoService, Todo } from './todo.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('todos')
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
