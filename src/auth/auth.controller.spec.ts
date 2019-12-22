import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('Auth Controller', () => {
  let controller: AuthController;

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
        UserModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' }
        })
      ],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
