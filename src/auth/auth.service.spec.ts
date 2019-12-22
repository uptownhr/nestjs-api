import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypegooseModule } from 'nestjs-typegoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mongod = new MongoMemoryServer({
      binary: {
        version: '3.6.12',
      },
    });

    const DB_URI = await mongod.getConnectionString();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' }
        }),
        TypegooseModule.forRoot(DB_URI, {
          useNewUrlParser: true,
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
