import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './application/user.service';
import { FirestoreUserRepository } from './infrastructure/firestore-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [
    AuthModule,
  ],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: FirestoreUserRepository,
    },
  ],
})
export class UsersModule {}