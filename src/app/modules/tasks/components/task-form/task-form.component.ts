import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Task } from "../../../../core/models/task.model";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class TaskFormComponent {
 
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<TaskFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { task?: Task }) {

    if (data.task) {
      this.form.patchValue({
        title: data.task.title,
        description: data.task.description,
      });
    }

  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.form.reset();
    }
  }
}