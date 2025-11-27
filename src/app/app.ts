import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from "./components/todo-list/todo-list";

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule, TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager');
}