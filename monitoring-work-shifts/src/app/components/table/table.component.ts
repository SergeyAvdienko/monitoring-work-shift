import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { DefaultService } from '../../services/defaultData.service';
import { Row } from '../../services/rowFactory.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    DefaultService
  ]
})
export class TableComponent {

  @Output() updateDataUp = new EventEmitter();
  @Output() deleteDataUp = new EventEmitter();

  // Массив ячеек для передачи компоненту app-body-table
  @Input() rowsBody!: Row[];

  // Массив ячеек для передачи компоненту app-head-table
  rowsHead: Row[] = this.defaultData.defaultHearRow;

  constructor(private defaultData: DefaultService, public filterSrvice: FilterService) { }

  update(id: any) {
    this.updateDataUp.emit(id);
  }

  delete(id: any) {
    this.deleteDataUp.emit(id);
  }

}
