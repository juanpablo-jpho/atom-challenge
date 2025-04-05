import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export type DialogType = 'confirm' | 'info';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  type?: DialogType;
}

@Component({
  standalone: true,
  selector: 'app-confirmation-dialog',
  imports: [
    CommonModule, 
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }
}