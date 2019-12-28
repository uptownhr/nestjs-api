import { prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { User } from '../user/user.model';
import { Card } from './card.model';

export class CardUser {
  @ApiProperty({type: String})
  @prop({required: true, ref: 'User'})
  user!: Ref<User>;

  @ApiProperty({type: String})
  @prop({required: true, ref: 'Card'})
  card!: Ref<Card>;
}
