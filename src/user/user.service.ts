import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {}

  async createUser({username, password}) {
    return await this.UserModel.create({username, password});
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({ username });
  }
}

export { User };
