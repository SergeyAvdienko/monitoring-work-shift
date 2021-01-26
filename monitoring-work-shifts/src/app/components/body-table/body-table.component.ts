import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cell, CellUpgrade, CellFactory } from '../../services/cellFactory.service';

@Component({
  selector: 'app-body-table',
  templateUrl: './body-table.component.html',
  styleUrls: ['./body-table.component.scss'],
  providers: [
    CellFactory
  ]
})
export class BodyTableComponent implements OnInit {

  @Input() cell!: Cell;
  @Input() id!: any;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  cellFormat!: CellUpgrade;

  constructor(private cellFactory: CellFactory) { }

  ngOnInit(): void {

    this.cellFormat = this.cellFactory.create(this.cell.title, this.cell.type);
    // console.log(this.cellFormat)

  }

  updateRow() {
    this.update.emit(this.id);
  }

  deleteRow() {
    this.delete.emit(this.id);
  }

}
