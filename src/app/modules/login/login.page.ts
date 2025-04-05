import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ConfirmationDialogComponent
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
      private authService: AuthService
    ) {}

    onSubmit() {
      if (this.form.invalid) return;
    
      const email = this.form.value.email!;
      this.authService.checkUserExists(email).then((exists) => {
        if (exists) {
          this.login(email);
        } else {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              type: 'confirm',
              title: 'Usuario no encontrado',
              message: `¿Deseas crear una cuenta con el correo "${email}"?`,
            },
          });
    
          dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
              this.login(email); // también crea y guarda token
            }
          });
        }
      }).catch(() => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            type: 'ok',
            title: 'Error',
            message: 'No se pudo validar el correo. Intenta más tarde.',
          },
        });
      });
    }
    
    private login(email: string) {
      this.authService.login(email).then(() => {
        this.router.navigate(['/tasks']);
      }).catch(() => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            type: 'ok',
            title: 'Error',
            message: 'Hubo un error al iniciar sesión.',
          },
        });
      });
    }
}
