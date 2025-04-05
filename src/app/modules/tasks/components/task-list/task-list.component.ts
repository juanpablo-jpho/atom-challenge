import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../../../core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [
    CommonModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatButtonModule,
    TaskItemComponent
  ]
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();

  onCheckboxChange(task: Task) {
    this.toggle.emit({ ...task, completed: !task.completed });
  }
  
}
