import { Component, OnInit } from '@angular/core';
import { TodosService } from './services/todos.service';
import { Todo } from './services/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  todo: string = '';
  newTodo: object = {};
  title: string = 'todo-app';
  done: boolean = false;
  editing: boolean = false;
  editingId: number;

  dir: any = localStorage.getItem('dir')
    ? localStorage.getItem('dir')
    : localStorage.setItem('dir', 'ltr');

  constructor(public todosService: TodosService) {
    try {
      document.dir = this.dir;
    } catch (err) {
      console.log('err', err);
    }
    console.log('dir', this.dir);
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      console.log('this.todos', this.todos);
    });
  }

  toggleDir(dir: string): void {
    if (dir === 'rtl') {
      document.dir = 'ltr';
      this.dir = 'ltr';
      localStorage.setItem('dir', 'ltr');
    } else {
      document.dir = 'rtl';
      this.dir = 'rtl';
      localStorage.setItem('dir', 'rtl');
    }
  }

  editContent(todo): void {
    this.editingId = todo.id;
    this.editing = true;

    console.log('editContent', todo, this.editing);
  }

  add() {
    let id = this.todos[this.todos.length - 1]?.id + 1 || 0;
    // let id = ~~(Math.random() * 100 + 1);
    this.todosService
      .create({
        id,
        title: this.todo,
        done: this.done,
      })
      .subscribe((res) => {
        const { id, title, done } = res;
        this.todos.push({ id, title, done });
        this.todo = '';
        console.log('create res', res);
      });
  }

  edit(todo): void {
    console.log('edit', todo);
    this.todosService
      .update(todo.id, {
        id: todo.id,
        title: todo.title,
        done: todo.done,
      })
      .subscribe((res) => {
        console.log('edit res', res);
        this.editing = false;
        this.editingId = 0;
      });
  }

  delete(id): void {
    console.log('delete', id);
    this.todosService.delete(id).subscribe((res) => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      console.log('delete res', res);
    });
  }
}
