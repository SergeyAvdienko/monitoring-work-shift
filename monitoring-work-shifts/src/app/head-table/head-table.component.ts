import { Component, Input, OnInit } from '@angular/core';
import { Cell } from '../services/cellFactory.service';

@Component({
  selector: 'app-head-table',
  templateUrl: './head-table.component.html',
  styleUrls: ['./head-table.component.scss']
})
export class HeadTableComponent implements OnInit {

  @Input() cell!: Cell;

  constructor() { }

  ngOnInit(): void {
  }

}
