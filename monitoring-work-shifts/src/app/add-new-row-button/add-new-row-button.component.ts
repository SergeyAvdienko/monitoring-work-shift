import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-row-button',
  templateUrl: './add-new-row-button.component.html',
  styleUrls: ['./add-new-row-button.component.scss']
})
export class AddNewRowButtonComponent {

  // Передача в компонент App, чтобы перевести значение open в true
  @Output() openModal = new EventEmitter();

  // Открыть модальное окно
  onClick() {
    this.openModal.emit(true);
  }

}
