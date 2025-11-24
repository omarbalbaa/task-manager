import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../models/task';
import { LocalStorage } from '../services/local-storage';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  taskInput = new FormControl('');
  loadedData: string | null = null;

  constructor(private localStorage: LocalStorage) {}

  ngOnInit(): void {
    this.loadData();
  }

  saveData(): void {
    this.localStorage.setItem('demoData', this.taskInput);
    alert('Data saved successfully!');
  }

  loadData(): void {
    this.loadedData = this.localStorage.getItem('demoData');
  }
}
