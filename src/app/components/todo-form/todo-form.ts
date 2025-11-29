import { Component, inject } from '@angular/core';
import { LocalTaskService } from '../../services/local-task-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel, TStatusType } from '../../models/task';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  taskService = inject(LocalTaskService);
  taskForm: FormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    status: new FormControl<TStatusType>('pending', { nonNullable: true }),
  });

  onSave() {
    this.taskService.addNewTask(new TaskModel(this.taskForm.getRawValue()));
    this.taskForm.reset();
  }

  onDelete(taskId: number) {
    const isDelete = confirm('Are You sure you want to Delete?');
    if (isDelete) {
      this.taskService.deleteTask(taskId);
    }
  }
  onOnProgress(taskId: number) {
    this.taskService.updateTask(taskId, { status: 'in-progress' });
  }
  onDone(taskId: number) {
    this.taskService.updateTask(taskId, { status: 'done' });
  }
}
