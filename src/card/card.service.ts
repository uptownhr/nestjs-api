import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Card } from './card.model';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { CardUser } from './card.user.model';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private readonly CardModel: ReturnModelType<typeof Card>,
    @InjectModel(CardUser) private readonly CardUserModel: ReturnModelType<typeof CardUser>,
  ) {}

  async create(createTodoDto: Card): Promise<DocumentType<Card>> {
    const createdTodo = new this.CardModel(createTodoDto);

    return await createdTodo.save();
  }

  async findAll(): Promise<Card[] | null> {
    return await this.CardModel.find().exec();
  }

  async addCardUser(userId, cardId): Promise<CardUser> {
    const cardUser = this.CardUserModel.create({
      user: userId,
      card: cardId
    });

    return cardUser;
  }
}

export { Card };
