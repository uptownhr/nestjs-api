import { Test, TestingModule } from '@nestjs/testing';
import { User, UserService } from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule } from 'nestjs-typegoose';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mongod = new MongoMemoryServer({
      binary: {
        version: '3.6.12',
      },
    });

    const DB_URI = await mongod.getConnectionString();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRoot(DB_URI, {
          useNewUrlParser: true,
        }),
        TypegooseModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
