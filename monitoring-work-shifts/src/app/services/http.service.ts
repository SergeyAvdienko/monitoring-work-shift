import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Row } from "./rowFactory.service";

@Injectable()

export class Http {

  constructor(private http: HttpClient) { }

  // Получаем текущий список рабочих смен
  // Каждая смена является массивом ячеек типа Row[], 
  // которые состоят из Row.id - присвоенного сервером и свойством Row.array - массив ячеек типа Cell[]
  // Возвращаем стрим
  getRowsBody(): Observable<Row[]> {
    return this.http.get<Row[]>('https://jsonplaceholder.typicode.com/users?_limit=3')
  }

  // Отправим данные на сервер для создания новой записи
  // Возвращаем стрим
  addRowsBody(row: Row): Observable<Row> {
    return this.http.post<Row>('https://jsonplaceholder.typicode.com/todos', row)
  }

  // Отправим данные на сервер для изменения существующей записи
  // Возвращаем стрим
  putRowsBody(row: Row, id: string): Observable<Row> {
    return this.http.put<Row>(`https://jsonplaceholder.typicode.com/todos/${id}`, row)
  }

  // Отправим данные на сервер для удаления существующей записи
  // Возвращаем стрим
  deleteRowsBody(id: string): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

}