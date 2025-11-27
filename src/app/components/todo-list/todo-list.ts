import { Component, inject, signal } from '@angular/core';
import { LocalTaskService } from '../../services/local-task-service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskModel } from '../../models/task';
import { EditForm } from './edit-form/edit-form';

@Component({
  selector: 'app-todo-list',
  imports: [CdkDrag, CdkDropList, EditForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  editedTask = signal<TaskModel | null>(null);
  public childValue: boolean = false;
  handleDataFromChild(data: boolean) {
    if (data){
      this.cancelEdit();      
    }
    this.childValue = data;
    console.log('Data received in parent:', this.childValue);
  }

  taskService = inject(LocalTaskService);
  taskObj: TaskModel = new TaskModel();
  isEditing: boolean = false;
  constructor() {
    this.isEditing = false;
  }

  onEdit(task: TaskModel) {
    this.editedTask.set(task);
    this.taskObj = task;
  }
  setEditingTask(task: TaskModel) {
    this.editedTask.set(task);
  }
  cancelEdit(): void {
    this.editedTask.set(null) ;
  }
  
  // onUpdate() {
  //   if (this.taskForm.invalid) return;

  //   const id = this.taskForm.controls['id'].value;
  //   const name = this.taskForm.controls['name'].value;

  //   this.taskService.updateTask(id, { name });
  //   this.reset();
  // }

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
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskService.tasksSignal(), event.previousIndex, event.currentIndex);
  }
}
