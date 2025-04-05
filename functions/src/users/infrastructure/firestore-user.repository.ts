import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { UserFactory } from '../domain/factories/user.factory';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreUserRepository implements UserRepository {
    
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection('users');

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return new User(doc.id, doc.data().email);
  }

  async create(email: string): Promise<User> {
    const user = UserFactory.create(email);
    await this.collection.doc(user.id).set({ email: user.email, id: user.id });
    return user;
  }
}