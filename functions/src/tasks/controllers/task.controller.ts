import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { TaskService } from '../application/task.service';
  import { CreateTaskDto } from '../dto/create-task.dto';
  import { UpdateTaskDto } from '../dto/update-task.dto';
  import { Task } from '../domain/entities/task.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
  
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly service: TaskService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@CurrentUser() user: AuthPayload) {
      return this.service.getAll(user.id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(
      @CurrentUser() user: AuthPayload,
      @Body() dto: CreateTaskDto
    ) {
      return this.service.create(user.id, dto.title, dto.description);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':taskId')
    update(
      @CurrentUser() user: AuthPayload,
      @Param('taskId') taskId: string,
      @Body() dto: UpdateTaskDto
    ) {
      const task = new Task(
        taskId,
        user.id,
        dto.title ?? '',
        dto.description ?? '',
        new Date(), // opcional: puedes pasar el original si lo traes antes
        dto.completed ?? false
      );
      return this.service.update(task);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':taskId')
    delete(
      @CurrentUser() user: AuthPayload,
      @Param('taskId') taskId: string
    ) {
      return this.service.delete(user.id, taskId);
    }
  }


  interface AuthPayload {
    id: string;
    email: string;
  }  