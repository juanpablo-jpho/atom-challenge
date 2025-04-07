import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../shared/services/dialog.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    TaskFormComponent,
    TaskListComponent,
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss'
})
export class TasksPage {
  tasks: Task[] = [];
    readonly dialog = inject(MatDialog);

  constructor(private taskService: TaskService, 
              private router: Router,
              private dialogService: DialogService,
              private authService: AuthService) {}

  async ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  async toggleTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index].completed = updatedTask.completed;
      }
    });
  }

  async deleteTask(task: Task) {

    const confirmed = await this.dialogService.confirm(
      'Eliminar tarea',
      `¿Estás seguro que deseas eliminar la tarea "${task.title}"?`,
    );
  
    if (confirmed) {
      this.taskService.deleteTask(task.id!).subscribe(() => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      });
    }
    
  }

  async openNewTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {}, 
      width: '800px',
      maxWidth: '75vw',
    });
  
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.taskService.createTask(result).subscribe((task) => {
          this.tasks.unshift(task);
        });
      }
    });
  }
  
  async openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { task },
      width: '800px',
      maxWidth: '75vw',
    });
  
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        const updated: Task = { ...task, ...result };
        this.taskService.updateTask(updated).subscribe(() => {
          const index = this.tasks.findIndex((t) => t.id === updated.id);
          if (index !== -1) this.tasks[index] = updated;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.tasks = [];
  }
} 
