import { Pipe, PipeTransform } from '@angular/core';
import { Cell } from '../services/cellFactory.service';
import { DecoratorRow } from '../services/decoratorRow.service';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  // Трансформирует (отфильтровывает) данные в массиве rowsBody и возвращает их
  transform(cells: Cell[], search: string = ''): Cell[] {
    // Если пустая строка то просто возвращаем ячейку
    if (!search.trim()) return this.decoration(cells);
    // Фильтруем cells по символам в search 
    if (cells[0].title.toLowerCase().includes(search.toLowerCase())) return this.decoration(cells);
    if (new Date(Number(cells[1].title)).toLocaleString().includes(search)) return this.decoration(cells);
    if (new Date(Number(cells[2].title)).toLocaleString().includes(search)) return this.decoration(cells);
    if (cells[3].title.toLowerCase().includes(search.toLowerCase())) return this.decoration(cells);
    if (cells[4].title.toLowerCase().includes(search.toLowerCase())) return this.decoration(cells);
    // Если нет cells по символам в search 
    return [];
  }

  decoration(cells: Cell[]) {
    return new DecoratorRow(cells).filterRow()
  }

}