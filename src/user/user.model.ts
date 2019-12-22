import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password: string;
}
