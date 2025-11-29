import { Injectable, signal } from '@angular/core';
import { TaskModel } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class LocalTaskService {
  tasksSignal = signal<TaskModel[]>([]);

  constructor() {
    this.loadFromStorage();
  }
  private loadFromStorage() {
    try{
      const oldData = localStorage.getItem('data');
    if (oldData != null) {
      this.tasksSignal.set(JSON.parse(oldData));
    }
    } catch (e){
      localStorage.clear();
      console.log("Invalid data detected! Tasks removed to keep the app safe!");
    }
  }
  private saveToStorage() {
    try{
      localStorage.setItem('data', JSON.stringify(this.tasksSignal()));
    } catch (e){
      localStorage.clear();
      console.log("Invalid data detected! Tasks removed to keep the app safe!");
    }
  }

  addNewTask(task: TaskModel) {
    const oldData = localStorage.getItem('data');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      let currentLastId: number = 1;
      if (parseData.length > 0) {
        currentLastId = parseData[0].id + 1;
      }
      while (this.tasksSignal().some((item) => item.id === currentLastId)) {
        currentLastId += 1;
      }
      task.id = currentLastId;
      this.tasksSignal().unshift(task);
    } else {
      this.tasksSignal().unshift(task);
    }
    this.saveToStorage();
  }

  updateTask(id: number, changes: Partial<TaskModel>) {
    const updated = this.tasksSignal().map((task) =>
      task.id === id ? { ...task, ...changes } : task
    );
    this.tasksSignal.set(updated);
    this.saveToStorage();
  }

  deleteTask(id: number) {
    const index = this.tasksSignal().findIndex((i) => i.id == id);
    this.tasksSignal().splice(index, 1);
    this.saveToStorage();
  }
}
