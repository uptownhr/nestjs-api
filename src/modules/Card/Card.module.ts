import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Card } from './Card.model';
import { CardController } from './Card.controller';
import { CardService } from './Card.service';

@Module({
  imports: [TypegooseModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
