import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule } from 'nestjs-typegoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';

import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './card.model';
import { CardUser } from './card.user.model';

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
        TypegooseModule.forFeature([Card, CardUser]),
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
      const res = await cardController.getCards();

      expect(res.length).toBeGreaterThan(0);
    });
  });

  describe('addCardUser', () => {
    it('should create CardUser', async () => {
      const card = {
        title: 'did you get this?',
      };

      const c1 = await cardController.create(card);

      const userId = Types.ObjectId();
      const cardUser = {
        user: userId,
        card: c1.id.toString()
      };

      const res = await cardController.addCardUser(cardUser);

      expect(res.card.toString()).toBe(cardUser.card);
      expect(res.user.toString()).toBe(userId.toString());

    });
  });

  describe('selfAddCardUser', () => {
    it('should create CardUser for currentUser', async () => {
      const card = {
        title: 'did you get this?',
      };

      const c1 = await cardController.create(card);

      const userId = Types.ObjectId();
      const currentUser = {
        _id: userId.toString(),
        username: 'testing'
      };

      const cardId = c1.id.toString();

      const res = await cardController.selfAddCardUser(cardId, currentUser);

      expect(res.card.toString()).toBe(cardId);
      expect(res.user.toString()).toBe(userId.toString());
    });
  });

  describe('selfGetCards', () => {
    it('should return Cards for auth User', async () => {
      const card = {
        title: 'did you get this?',
      };

      const c1 = await cardController.create(card);

      const userId = Types.ObjectId();
      const currentUser = {
        _id: userId.toString(),
        username: 'testing'
      };

      const cardId = c1._id.toString();

      await cardController.selfAddCardUser(cardId, currentUser);

      const res = await cardController.selfGetCards(currentUser);

      expect(res.length).toBeGreaterThan(0);
      expect(res[0].id.toString()).toBe(cardId);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
