import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Todo } from './Todo.model';
import { TodoController } from './Todo.controller';
import { TodoService } from './Todo.service';

@Module({
  imports: [TypegooseModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
