import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Card } from './card.model';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  imports: [TypegooseModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
