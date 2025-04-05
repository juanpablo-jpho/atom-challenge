import { User } from '../entities/user.entity';
import { randomUUID } from 'crypto';

export class UserFactory {
  static create(email: string): User {
    return new User(randomUUID(), email);
  }
}