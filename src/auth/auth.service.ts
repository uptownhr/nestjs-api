import { Injectable } from '@nestjs/common';
import { UserService, User } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DocumentType } from '@typegoose/typegoose';

import {IAuthToken} from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: DocumentType<User>) {
    const payload: IAuthToken = {
      username: user.username,
      _id: user._id
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto) {
    return this.userService.createUser(userDto);
  }
}
