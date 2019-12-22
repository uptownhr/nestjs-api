import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

class CardContent {
  @ApiProperty()
  front: string;

  @ApiProperty()
  back: string;
}

export class Card {
  @ApiProperty()
  @prop({ required: true })
  title!: string;

  @ApiProperty()
  content?: CardContent;
}
