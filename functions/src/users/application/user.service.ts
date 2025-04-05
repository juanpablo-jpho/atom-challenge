import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async createUser(email: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) return existing;
    return this.userRepo.create(email);
  }
}