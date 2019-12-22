import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Card } from './card.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private readonly CardModel: ReturnModelType<typeof Card>,
  ) {}

  async create(createTodoDto: Card): Promise<Card> {
    const createdTodo = new this.CardModel(createTodoDto);

    return await createdTodo.save();
  }

  async findAll(): Promise<Card[] | null> {
    return await this.CardModel.find().exec();
  }
}

export { Card };
