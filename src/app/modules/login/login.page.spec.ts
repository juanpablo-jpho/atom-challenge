import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../core/services/auth.service';
import { DialogService } from '../../shared/services/dialog.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let dialogService: jasmine.SpyObj<DialogService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['checkUserExists', 'login']);
    dialogService = jasmine.createSpyObj('DialogService', ['confirm', 'alert']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, LoginPage],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: DialogService, useValue: dialogService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should login directly if user exists', async () => {
    const email = 'existing@example.com';
    component.form.controls.email.setValue(email);

    authService.checkUserExists.and.resolveTo(true);
    authService.login.and.resolveTo();

    await component.onSubmit();

    expect(authService.checkUserExists).toHaveBeenCalledWith(email);
    expect(authService.login).toHaveBeenCalledWith(email);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should confirm and login if user does not exist and accepts', async () => {
    const email = 'new@example.com';
    component.form.controls.email.setValue(email);

    authService.checkUserExists.and.resolveTo(false);
    dialogService.confirm.and.resolveTo(true);
    authService.login.and.resolveTo();

    await component.onSubmit();

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(email);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should cancel login if user does not exist and cancels dialog', async () => {
    const email = 'cancel@example.com';
    component.form.controls.email.setValue(email);

    authService.checkUserExists.and.resolveTo(false);
    dialogService.confirm.and.resolveTo(false);

    await component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should show error alert if checkUserExists fails', async () => {
    const email = 'error@example.com';
    component.form.controls.email.setValue(email);

    authService.checkUserExists.and.rejectWith(new Error('Connection error'));

    await component.onSubmit();

    expect(dialogService.alert).toHaveBeenCalled();
    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});