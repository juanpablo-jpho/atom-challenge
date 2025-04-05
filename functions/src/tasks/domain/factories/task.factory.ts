import { Task } from '../entities/task.entity';
import { randomUUID } from 'crypto';

export class TaskFactory {
  static create(userId: string, title: string, description: string): Task {
    return new Task(
      randomUUID(),
      userId,
      title,
      description,
      new Date(),
      false
    );
  }

  static rebuild(
    id: string,
    userId: string,
    title: string,
    description: string,
    createdAt: Date,
    completed: boolean
  ): Task {
    return new Task(id, userId, title, description, createdAt, completed);
  }
}