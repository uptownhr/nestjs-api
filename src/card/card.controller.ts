import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardService, Card } from './card.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getCards(): Promise<Card[] | null> {
    return await this.cardService.findAll();
  }

  @Post()
  async create(@Body() card: Card): Promise<Card> {
    return await this.cardService.create(card);
  }
}
