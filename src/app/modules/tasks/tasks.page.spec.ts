import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPage } from './tasks.page';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from '../../shared/services/dialog.service';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let taskService: jasmine.SpyObj<TaskService>;
  let dialogService: jasmine.SpyObj<DialogService>;


  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Tarea 1',
      description: 'Desc 1',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Tarea 2',
      description: 'Desc 2',
      completed: true,
      createdAt: new Date()
    },
  ];

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['getTasks', 'toggle', 'deleteTask']);
    dialogService = jasmine.createSpyObj('DialogService', ['confirm', 'alert']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, 
        HttpClientTestingModule,
        TasksPage
     ],
      providers: [
        { provide: TaskService, useValue: taskService },
        { provide: DialogService, useValue: dialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load tasks on init', () => {
    taskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });


  it('should delete task', async () => {
    const task = mockTasks[0];
    component.tasks = [...mockTasks];
  
    dialogService.confirm.and.resolveTo(true); // usuario confirma
    taskService.deleteTask.and.returnValue(of(void 0)); // tarea eliminada
  
    await component.deleteTask(task); // 👈 await aquí
  
    expect(taskService.deleteTask).toHaveBeenCalledWith(task.id!);
  });
});