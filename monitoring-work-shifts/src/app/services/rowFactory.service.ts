import { Injectable } from "@angular/core";

export interface Row {
  array: Array<any>;
  id?: string;
}
// id не обязателен, так как ожидается его получение от сервера

@Injectable({ providedIn: 'root' })

export class RowFactory {

  row: Row[] = [];

  constructor() { }

  print() {
    console.log(this.row)
  }

}