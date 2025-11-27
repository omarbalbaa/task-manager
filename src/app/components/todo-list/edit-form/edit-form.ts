import { Component, inject, input, output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from '../../../models/task';
import { LocalTaskService } from '../../../services/local-task-service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm implements OnInit {
  taskService = inject(LocalTaskService);
  idFromParent  = input();
  childEvent = output<boolean>();
  
  taskForm: FormGroup = new FormGroup({});
  taskObj?: TaskModel;
  

  constructor() {
    console.log("id from parent at constructor " + this.idFromParent());
    // const task = this.getEditingTask();
    // if (task) {
    //   this.onEdit(task);
    // }
  }
  ngOnInit(){
    console.log("id from parent at OnInit " + this.idFromParent());
    const task = this.getEditingTask();
    this.taskObj = this.getEditingTask();
    if (task) {
      this.onEdit(task);
    }
    console.log("taskObj at OnInit " + this.taskObj?.name);
    console.log(task);
  }
  getEditingTask() {
    return this.taskService.tasksSignal().find((i) => i.id == this.idFromParent());
  }
  
  createForm() {
    if (this.taskObj != undefined) {
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
  }
  // taskObj = this.getEditingTask();
  onCancelUpdates() {
    this.childEvent.emit(true);
  }
  onEdit(task: TaskModel | undefined) {
    if (!this.taskObj) return;
    this.taskObj = task;
    console.log(this.taskObj);
    this.createForm();
  }
  onUpdate() {
    if (this.taskForm.invalid) return;

    const id = this.taskForm.controls['id'].value;
    const name = this.taskForm.controls['name'].value;
    this.taskService.updateTask(id, { name });
    // const record = this.getEditingTask();
    // if (record != undefined) {
    //   record.name = this.taskForm.controls['name'].value;
    // }
    // localStorage.setItem('data', JSON.stringify(this.taskService.tasksSignal));
    // this.taskObj = new TaskModel();
    // this.createForm();
    this.childEvent.emit(true);
  }
}
