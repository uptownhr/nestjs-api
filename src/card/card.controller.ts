import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardService, Card } from './card.service';
import { ApiTags } from '@nestjs/swagger';
import { CardUser } from './card.user.model';
import { DocumentType } from '@typegoose/typegoose';

@ApiTags('todos')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getCards(): Promise<Card[] | null> {
    return await this.cardService.findAll();
  }

  @Post()
  async create(@Body() card: Card): Promise<DocumentType<Card>> {
    return await this.cardService.create(card);
  }

  @Post('add-card-user')
  async addCardUser(@Body() cardUser: CardUser): Promise<CardUser> {
    return this.cardService.addCardUser(cardUser.user, cardUser.card);
  }
}
