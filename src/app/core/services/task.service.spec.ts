import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockToken = 'test-token';
  const API_URL = `${environment.apiUrl}/tasks`;

  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);
    mockAuthService.getToken.and.returnValue('test-token');
  
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
  
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch tasks', () => {
    const mockTasks: Task[] = [
      { id: '1', title: 'T1', description: 'Desc 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'T2', description: 'Desc 2', completed: true, createdAt: new Date() },
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockTasks);
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task', description: 'New Desc' };
    const createdTask: Task = {
      id: '3',
      title: newTask.title,
      description: newTask.description,
      completed: false,
      createdAt: new Date(),
    };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(createdTask);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);

    req.flush(createdTask);
  });

  it('should delete a task', () => {
    const task = {
      id: '5',
      title: 'Delete Me',
      description: 'To be removed',
      completed: false,
      createdAt: new Date(),
    };

    service.deleteTask(task.id).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}/${task.id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should update a task', () => {
    const task: Task = {
      id: '6',
      title: 'Old Title',
      description: 'Old Desc',
      completed: false,
      createdAt: new Date(),
    };

    const updatedTask = { ...task, title: 'New Title', description: 'New Desc' };

    service.updateTask(updatedTask).subscribe(result => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne(`${API_URL}/${task.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(null);
  });
});