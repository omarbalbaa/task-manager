import { Component, inject, input, output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalTaskService } from '../../../services/local-task-service';

@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm implements OnInit {
  taskService = inject(LocalTaskService);
  idFromParent = input();
  hideEditForm = output<boolean>();

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    status: new FormControl('pending'),
  });

  ngOnInit() {
    const task = this.getEditingTask();
    if (task) {
      this.taskForm.patchValue(task);
    }
  }
  getEditingTask() {
    return this.taskService.tasksSignal().find((i) => i.id == this.idFromParent());
  }

  onCancelUpdates() {
    this.hideEditForm.emit(true);
    this.taskForm.reset();
  }

  onUpdate() {
    if (this.taskForm.invalid) return;
    const id = this.taskForm.controls['id'].value;
    const name = this.taskForm.controls['name'].value;
    this.taskService.updateTask(id, { name });
    this.hideEditForm.emit(true);
    this.taskForm.reset();
  }
}
