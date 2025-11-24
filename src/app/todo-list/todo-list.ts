import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { Task } from '../models/task';
import { LocalStorage } from '../services/local-storage';

@Component({
  selector: 'app-todo-list',
  imports: [CdkDrag, CdkDropList,],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  loadedData: string | null = null;
  constructor(private localStorage: LocalStorage) {}
  ngOnInit(): void {}

  loadData(): void {
    this.loadedData = this.localStorage.getItem('demoData');
  }
  tasks: Task[] = [
    {
      id: 0,
      title: "task 1",
      status: "done"
    },
    {
      id: 1,
      title: "task 2",
      status: "pending"
    },
    {
      id: 2,
      title: "task 3",
      status: "in-progress"
    }
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
