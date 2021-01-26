import { Injectable } from "@angular/core";

export interface Cell {
  title: string;
  type: string;
}

// Интерфейс ячейки Cell, который используется на выходе
export interface CellUpgrade {
  title?: string,
  icon?: string,
  summOnload?: number,
  summOffload?: number,
  summWork?: number,
  date?: any,
  firstCran?: string,
  secondCran?: string,
  type: string;
}

class сellInscription {
  title: string;
  type: string = 'text';
  constructor(title: string) {
    this.title = title;
  }
}

class сellIcon {
  icon!: string;
  type: string = 'icon';
  constructor(icon: string) {
    this.transform(icon);
  }

  transform(icon: string) {
    if (icon === 'Редактировать') this.icon = 'fas fa-edit';
    else if (icon === 'Удалить') this.icon = 'fas fa-trash';
  }
}

class сellSummOnload {
  summOnload: number;
  type: string = 'summOnload';
  constructor(summ: number) {
    this.summOnload = Number(summ);
  }
}

class сellSummOffload {
  summOffload: number;
  type: string = 'summOffload';
  constructor(summ: number) {
    this.summOffload = Number(summ);
  }
}

class cellSummWork {
  summWork: number;
  type: string = 'summWork';
  constructor(summ: number) {
    this.summWork = Number(summ);
  }
}

class сellDate {
  date: number;
  type: string = 'date';
  constructor(date: number) {
    this.date = date;
  }
}

class cellFirstCran {
  array: string;
  type: string = 'firstCran';
  constructor(arr: string) {
    this.array = arr;
  }
}

class cellSecondCran {
  array: string;
  type: string = 'secondCran';
  constructor(arr: string) {
    this.array = arr;
  }
}

@Injectable()

export class CellFactory {

  list: any = {
    title: сellInscription,
    icon: сellIcon,
    summOnload: сellSummOnload,
    summOffload: сellSummOffload,
    summWork: cellSummWork,
    date: сellDate,
    firstCran: cellFirstCran,
    secondCran: cellSecondCran
  }

  // Фабрика производит ячейку Cell типа CellUpgrade из исходной Cell
  create(info: any, type: string = 'title') {

    const cellClass = this.list[type] || this.list.title;
    const Cell = new cellClass(info, type);

    // console.log(Cell)

    Cell.defineType = function () {
      console.log(`Ячейка с типом: ${this.type}`)
    }

    return Cell;
  }

}