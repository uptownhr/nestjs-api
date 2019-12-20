import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoModule } from './modules/Todo/Todo.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest', {
      useNewUrlParser: true
    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
