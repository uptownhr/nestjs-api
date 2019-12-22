import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Todo } from './todo.model';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypegooseModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
