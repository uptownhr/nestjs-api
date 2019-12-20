import { prop } from '@typegoose/typegoose';

export class Todo {
  @prop({enum: ['confirmation'], default: 'confirmation'})
  type?: string;
  @prop({ required: true })
  name: string;
  @prop({
    enum: ['active', 'complete', 'cancelled'],
    default: 'active'
  })
  status?: string;
}
