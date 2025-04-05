import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/repositories/task.repository';
import { Task } from '../domain/entities/task.entity';
import { TaskFactory } from '../domain/factories/task.factory';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreTaskRepository implements TaskRepository {
  private readonly db = admin.firestore();

  async findAllByUser(userId: string): Promise<Task[]> {
    const snapshot = await this.db
      .collection(`users/${userId}/tasks`)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) =>
      TaskFactory.rebuild(
        doc.id,
        userId,
        doc.data().title,
        doc.data().description,
        doc.data().createdAt.toDate(),
        doc.data().completed
      )
    );
  }

  async create(task: Task): Promise<Task> {
    const ref = this.db.collection(`users/${task.userId}/tasks`).doc(task.id);
    await ref.set({
      title: task.title,
      description: task.description,
      createdAt: task.createdAt,
      completed: task.completed,
    });
    return task;
  }

  async update(task: Task): Promise<void> {
    const ref = this.db.collection(`users/${task.userId}/tasks`).doc(task.id);
    await ref.update({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
  }

  async delete(userId: string, taskId: string): Promise<void> {
    await this.db.collection(`users/${userId}/tasks`).doc(taskId).delete();
  }
}