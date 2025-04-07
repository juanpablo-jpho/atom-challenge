import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  async confirm(title: string, message: string): Promise<boolean> {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { type: 'confirm', title, message },
    });

    return await firstValueFrom(ref.afterClosed());
  }

  async alert(title: string, message: string): Promise<void> {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { type: 'ok', title, message },
    });

    await firstValueFrom(ref.afterClosed());
  }
}