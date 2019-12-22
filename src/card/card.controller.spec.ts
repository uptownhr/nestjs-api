import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule } from 'nestjs-typegoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './card.model';

describe('TodoController', () => {
  let app: TestingModule;
  let cardController: CardController;

  beforeAll(async () => {
    const mongod = new MongoMemoryServer({
      binary: {
        version: '3.6.12',
      },
    });

    const DB_URI = await mongod.getConnectionString();

    app = await Test.createTestingModule({
      imports: [
        TypegooseModule.forFeature([Card]),
        TypegooseModule.forRoot(DB_URI, {
          useNewUrlParser: true,
        }),
      ],
      controllers: [CardController],
      providers: [CardService],
    }).compile();

    cardController = app.get<CardController>(CardController);
  }, 20000);

  describe('create', () => {
    it('should create a card', async () => {
      const card = {
        title: 'did you get this?',
      };

      const res = await cardController.create(card);

      expect(res.title).toBe(card.title);
    });
  });

  describe('getCards', () => {
    it('should return Cards', async () => {
      const card = {
        title: 'did you get this?',
      };

      const res = await cardController.getCards();

      expect(res.length).toBeGreaterThan(0);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
