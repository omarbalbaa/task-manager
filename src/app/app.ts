import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskModel } from './models/task';

@Component({
  selector: 'app-root',
  imports: [CdkDrag, CdkDropList, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager');
  taskForm: FormGroup = new FormGroup({});
  taskObj: TaskModel = new TaskModel ();
  tasksList: TaskModel [] = [];

  constructor (){
    this.createForm();
    const oldData = localStorage.getItem("data");
    if (oldData != null) {
      this.tasksList =  JSON.parse(oldData);
    }
  }
  createForm(){
    this.taskForm = new FormGroup({
      id: new FormControl(this.taskObj.id),
      name: new FormControl(this.taskObj.name, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      status: new FormControl(this.taskObj.status)
    })
  }

  onSave(){
    const oldData = localStorage.getItem("data");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.taskForm.controls['id'].setValue(parseData.length + 1);
      this.tasksList.unshift(this.taskForm.value);
    } else {
      this.tasksList.unshift(this.taskForm.value);      
    }
    localStorage.setItem("data", JSON.stringify(this.tasksList));
    this.taskObj = new TaskModel();
    this.createForm();
  }
  onEdit(task: TaskModel) {
    this.taskObj = task;
    this.createForm();
  }
  onUpdate(){
    const record = this.tasksList.find( i => i.id == this.taskForm.controls['id'].value);
    if (record != undefined) {
      record.name = this.taskForm.controls['name'].value;
    }
    localStorage.setItem("data", JSON.stringify(this.tasksList))
    this.taskObj = new TaskModel();
    this.createForm();
  }

  onDelete(taskId: number){
    const isDelete = confirm ("Are You sure you want to Delete?");
    if (isDelete) {
      const index = this.tasksList.findIndex(i => i.id == taskId);
      this.tasksList.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(this.tasksList));
    }
  }
  onOnProgress (taskId: number){
    const record = this.tasksList.find( i => i.id == taskId);
    if (record != undefined) {
      record.status = "in-progress";
    }
      localStorage.setItem("data", JSON.stringify(this.tasksList));
  }
  onDone(taskId: number){
    const record = this.tasksList.find( i => i.id == taskId);
    if (record != undefined) {
      record.status = "done";
    }
      localStorage.setItem("data", JSON.stringify(this.tasksList));
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
  }
}
