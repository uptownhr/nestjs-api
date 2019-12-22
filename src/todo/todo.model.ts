import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty()
  @prop({enum: ['confirmation'], default: 'confirmation'})
  type?: string;

  @ApiProperty()
  @prop({ required: true })
  name: string;

  @ApiProperty()
  @prop({
    enum: ['active', 'complete', 'cancelled'],
    default: 'active'
  })
  status?: string;
}
