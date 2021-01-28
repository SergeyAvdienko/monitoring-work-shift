import { Component, EventEmitter, Output } from '@angular/core';
import { AppFacade } from 'src/app/app.facade';

@Component({
  selector: 'app-add-new-row-button',
  templateUrl: './add-new-row-button.component.html',
  styleUrls: ['./add-new-row-button.component.scss'],
  providers: [
    AppFacade
  ]
})
export class AddNewRowButtonComponent {

  @Output() createForm = new EventEmitter;

  constructor(private appFacade: AppFacade) { }

  // Открыть модальное окно
  onClick() {
    this.createForm.emit();
    this.appFacade.register([
      'Открой модальное окно',
      true
    ])
  }

}
