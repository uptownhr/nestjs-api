import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

class CardContent {
  front: string;
  back: string;
}

export class Card {
  @ApiProperty()
  @prop({ required: true })
  title!: string;

  content?: CardContent;
}
