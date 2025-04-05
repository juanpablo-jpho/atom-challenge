import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiUrl}/tasks`;

@Injectable({ providedIn: 'root' })
export class TaskService {
    
  constructor(private http: HttpClient) {}


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(API_URL, task);
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${API_URL}/${task.id}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${taskId}`);
  }
}