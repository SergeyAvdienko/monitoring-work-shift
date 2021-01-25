import { Injectable } from "@angular/core";
import { Cell } from "./cellFactory.service";
import { RowFactory } from "./rowFactory.service";
@Injectable()

export class DecoratorRow {

  // Ячейки какого типа останутся в строке
  includedCellType: Array<string> = ['text', 'date', 'summOnload', 'icon'];
  disabledCellType: Array<string> = ['summOffload', 'summWork', 'firstCran', 'secondCran'];

  row: Array<Cell> = [];

  constructor(private array: Array<Cell>) {
    this.row = this.array
  }

  // Оставляем в строке (Row) только нужные типы ячеек (Cell.type)
  filterRow() {

    let newRow = this.row;

    return this.row = this.row.filter(cell => {
      if (this.includedCellType.includes(cell.type)) {
        return cell;
      } else {
        this.controlType(cell);
        return;
      }
    });

  }

  // Сообщить, если у нас появился неизвестный тип данных в ячейке (Cell смотри cellFactory)
  controlType(cell: any) {
    try {
      if (!this.disabledCellType.includes(cell.type)) {
        return new Error('В строку попала ячейка неизвестного типа: ' + cell);
      }
    } catch (error) {
      return console.log(error);
    }
  }

}