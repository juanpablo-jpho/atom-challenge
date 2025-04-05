import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})

export class TaskItemComponent {
    @Input() task!: Task;
    @Output() toggle = new EventEmitter<Task>();
    @Output() remove = new EventEmitter<Task>();
    @Output() edit = new EventEmitter<Task>();
    
    onCheckboxChange() {
      this.toggle.emit({ ...this.task, completed: !this.task.completed });
    }
    
    onEnterPress() {
      this.task.completed = !this.task.completed;
      this.toggle.emit(this.task);
    }

}
