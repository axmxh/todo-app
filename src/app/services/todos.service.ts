import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  url = 'https://my-json-server.typicode.com/axmxh/todos';

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.url + '/data')
      .pipe(catchError(this.handleError));
  }

  create(todo): Observable<Todo[]> {
    return this.http
      .post<Todo[]>(this.url + '/data', todo, this.options)
      .pipe(catchError(this.handleError));
  }

  update(id, todo): Observable<Todo[]> {
    return this.http
      .put<Todo[]>(this.url + '/data/' + id, todo, this.options)
      .pipe(catchError(this.handleError));
  }

  delete(id): Observable<Todo[]> {
    return this.http
      .delete<Todo[]>(this.url + '/data/' + id, this.options)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
