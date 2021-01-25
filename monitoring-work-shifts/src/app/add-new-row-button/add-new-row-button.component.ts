import { Component, EventEmitter, Output } from '@angular/core';
import { ModalStateService } from '../services/modalState.service';

@Component({
  selector: 'app-add-new-row-button',
  templateUrl: './add-new-row-button.component.html',
  styleUrls: ['./add-new-row-button.component.scss']
})
export class AddNewRowButtonComponent {

  constructor(private modalStateService: ModalStateService) { }

  // Открыть модальное окно
  onClick() {
    this.modalStateService.setModalState(true);
  }

}
