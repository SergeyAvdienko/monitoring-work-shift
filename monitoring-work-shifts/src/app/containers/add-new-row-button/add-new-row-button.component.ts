import { Component, EventEmitter, Output } from '@angular/core';
import { ModalStateService } from '../../services/modalState.service';

@Component({
  selector: 'app-add-new-row-button',
  templateUrl: './add-new-row-button.component.html',
  styleUrls: ['./add-new-row-button.component.scss']
})
export class AddNewRowButtonComponent {

  @Output() createForm = new EventEmitter;

  constructor(private modalStateService: ModalStateService) { }

  // Открыть модальное окно
  onClick() {
    this.createForm.emit();
    this.modalStateService.setModalState(true);
  }

}
