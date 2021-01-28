import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppFacade } from 'src/app/app.facade';
import { Row } from '../../services/rowFactory.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    AppFacade
  ]
})
export class TableComponent {

  @Output() updateDataUp = new EventEmitter();
  @Output() deleteDataUp = new EventEmitter();

  // Массив ячеек для передачи шаблону table для реализации *ngFor
  @Input() rowsBody!: Row[];

  // Массив ячеек для передачи шаблону table для реализации *ngFor
  rowsHead: Row[] = this.getDefaultHeadRow();

  constructor(private appFacade: AppFacade) { }

  getDefaultHeadRow() {
    return this.appFacade.register([
      'Покажи мне дефолтные значения для заполнения шапки таблицы',
      'headRow'
    ]);
  }

  validateString() {
    return this.appFacade.register([
      'Валидируй символы в строке'
    ])
  }

  update(id: any) {
    this.updateDataUp.emit(id);
  }

  delete(id: any) {
    this.deleteDataUp.emit(id);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
