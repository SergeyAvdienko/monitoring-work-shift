import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppFacade } from 'src/app/app.facade';
import { Cell, CellUpgrade } from '../../services/cellFactory.service';

@Component({
  selector: 'app-body-table',
  templateUrl: './body-table.component.html',
  styleUrls: ['./body-table.component.scss'],
  providers: [
    AppFacade
  ]
})
export class BodyTableComponent implements OnInit {

  @Input() cell!: Cell;
  @Input() id!: any;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  cellFormat!: CellUpgrade;

  constructor(private appFacade: AppFacade) { }

  ngOnInit(): void {

    // Обрабатыват каждую из ячеек поступающих на вход
    this.cellFormat = this.appFacade.register([
      'Обработай ячейку Cell с помощью паттерна Factory',
      this.cell.title,
      this.cell.type
    ]);

  }

  updateRow() {
    this.update.emit(this.id);
  }

  deleteRow() {
    this.delete.emit(this.id);
  }

}
