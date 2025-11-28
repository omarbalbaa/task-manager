import { Component, inject } from '@angular/core';
import { LocalTaskService } from '../../services/local-task-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../models/task';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  taskService = inject(LocalTaskService);
  taskForm: FormGroup = new FormGroup({});
  taskObj: TaskModel = new TaskModel();

  constructor() {
    this.createForm();
  }
  createForm() {
    this.taskForm = new FormGroup({
      id: new FormControl(this.taskObj.id),
      name: new FormControl(this.taskObj.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
      status: new FormControl(this.taskObj.status),
    });
  }
  reset() {
    this.taskObj = new TaskModel();
    this.createForm();
  }

  onSave() {
    this.taskService.addNewTask(this.taskForm.value);
    this.reset();
  }
  onEdit(task: TaskModel) {
    this.taskObj = task;
    this.createForm();
  }
  onUpdate() {
    if (this.taskForm.invalid) return;

    const id = this.taskForm.controls['id'].value;
    const name = this.taskForm.controls['name'].value;

    this.taskService.updateTask(id, { name });
    this.reset();
  }

  onDelete(taskId: number) {
    const isDelete = confirm('Are You sure you want to Delete?');
    if (isDelete) {
      this.taskService.deleteTask(taskId);
    }
  }
  onOnProgress(taskId: number) {
    this.taskService.updateTask(taskId, { status: "in-progress" });
  }
  onDone(taskId: number) {
    this.taskService.updateTask(taskId, { status: "done" });
  }
}
