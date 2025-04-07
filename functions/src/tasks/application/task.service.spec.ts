import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from '../domain/repositories/task.repository';
import { Task } from '../domain/entities/task.entity';

describe('TaskService', () => {
  let service: TaskService;
  let repository: jest.Mocked<TaskRepository>;

  beforeEach(async () => {
    const mockRepo: jest.Mocked<TaskRepository> = {
      findAllByUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get(TaskRepository);
  });

  it('should create a task', async () => {
    const createdAt = new Date();
    const createdTask = new Task('1', 'user1', 'Tarea', 'Desc', createdAt, false);
    repository.create.mockResolvedValue(createdTask);

    const result = await service.create('user1', 'Tarea', 'Desc');

    expect(repository.create).toHaveBeenCalledWith(expect.any(Task));
    expect(result).toBe(createdTask);
  });

  it('should return tasks by user', async () => {
    const now = new Date();
    const tasks = [
      new Task('1', 'user1', 'Tarea 1', 'Desc 1', now, false),
      new Task('2', 'user1', 'Tarea 2', 'Desc 2', now, true),
    ];
    repository.findAllByUser.mockResolvedValue(tasks);

    const result = await service.getAll('user1');

    expect(repository.findAllByUser).toHaveBeenCalledWith('user1');
    expect(result).toEqual(tasks);
  });

  it('should edit a task', async () => {
    const task = new Task('1', 'user1', 'Tarea', 'Desc', new Date(), false);
    repository.update.mockResolvedValue();

    await service.update({...task, title: 'Nueva', description: 'Actualizada'});

    expect(repository.update).toHaveBeenCalledWith(expect.objectContaining({
      ...task,
      title: 'Nueva',
      description: 'Actualizada',
    }));
  });

  it('should delete a task', async () => {
    repository.delete.mockResolvedValue();

    await service.delete('user1', 'task1');

    expect(repository.delete).toHaveBeenCalledWith('user1', 'task1');
  });
});