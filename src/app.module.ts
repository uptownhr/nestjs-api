import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TodoModule } from './todo/todo.module';
import { CardModule } from './card/card.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const mongoConnectionUrl = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-kgyge.mongodb.net/test?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/nest';

@Module({
  imports: [
    TypegooseModule.forRoot(mongoConnectionUrl, {
      useNewUrlParser: true
    }),
    TodoModule,
    CardModule,
    UserModule,
    AuthModule,
  ]
})

export class AppModule {}
