import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TodoModule } from './todo/todo.module';
import { CardModule } from './card/card.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest', {
      useNewUrlParser: true
    }),
    TodoModule,
    CardModule,
    UserModule,
    AuthModule,
  ]
})

export class AppModule {}
