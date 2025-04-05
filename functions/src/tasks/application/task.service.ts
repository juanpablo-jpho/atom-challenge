import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/repositories/task.repository';
import { Task } from '../domain/entities/task.entity';
import { TaskFactory } from '../domain/factories/task.factory';

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  getAll(userId: string): Promise<Task[]> {
    return this.repo.findAllByUser(userId);
  }

  create(userId: string, title: string, description: string): Promise<Task> {
    const task = TaskFactory.create(userId, title, description);
    return this.repo.create(task);
  }

  update(task: Task): Promise<void> {
    return this.repo.update(task);
  }

  delete(userId: string, taskId: string): Promise<void> {
    return this.repo.delete(userId, taskId);
  }
}