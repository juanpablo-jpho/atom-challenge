import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './application/task.service';
import { TaskRepository } from './domain/repositories/task.repository';
import { FirestoreTaskRepository } from './infrastructure/firestore-task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TaskController],
  imports: [
    AuthModule,
  ],
  providers: [
    TaskService,
    {
      provide: TaskRepository,
      useClass: FirestoreTaskRepository,
    },
  ],
})
export class TasksModule {}