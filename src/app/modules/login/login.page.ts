import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
    form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    readonly dialog = inject(MatDialog);

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private dialogService: DialogService
    ) {}

    async onSubmit() {
      if (this.form.invalid) return;
    
      const email = this.form.value.email!;
    
      try {
        const exists = await this.authService.checkUserExists(email);
    
        if (exists) {
          await this.login(email);
        } else {
          const confirmed = await this.dialogService.confirm(
            'Usuario no encontrado',
            `¿Deseas crear una cuenta con el correo "${email}"?`
          );
    
          if (confirmed) {
            await this.login(email);
          }
        }
      } catch (err) {
        await this.dialogService.alert(
          'Error',
          'No se pudo validar el correo. Intenta más tarde.'
        );
      }
    }
    
    private async login(email: string) {
      try {
        await this.authService.login(email);
        this.router.navigate(['/tasks']);
      } catch (err) {
        await this.dialogService.alert(
          'Error',
          'Hubo un error al iniciar sesión.'
        );
      }
    }
}
