import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoForm } from './todo-form/todo-form';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager');
}
