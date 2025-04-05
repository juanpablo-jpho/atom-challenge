import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract findAllByUser(userId: string): Promise<Task[]>;
  abstract create(task: Task): Promise<Task>;
  abstract update(task: Task): Promise<void>;
  abstract delete(userId: string, taskId: string): Promise<void>;
}