import { index, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { Card } from './card.model';

@index({user: 1, card: 1}, {unique: true})
export class CardUser {
  @ApiProperty({type: String})
  @prop({required: true, ref: 'User'})
  user!: Ref<User>;

  @ApiProperty({type: String})
  @prop({required: true, ref: 'Card'})
  card!: Ref<Card>;
}
