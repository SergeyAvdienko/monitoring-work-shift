import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppFacade } from 'src/app/app.facade';
import { Row } from '../../services/rowFactory.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  providers: [
    AppFacade
  ]
})
export class ModalWindowComponent {

  // Сброс в компоненте App значение переменной open в значение false;
  @Output() closeModal = new EventEmitter();
  // Передача в компонент App, чтобы добавить в массив rowsBody новую запись 
  @Output() addNewRow = new EventEmitter();
  // Передача в компонент App, чтобы изменить существующую запись в массиве rowsBody
  @Output() updateOldRow = new EventEmitter();

  // Также получает из App
  // this.form - заполнен данными всегда
  // this.id может быть '' || undefined, если форма открыта не для изменения существующей записи, а для создания новой
  @Input() id!: string;
  @Input() form!: FormGroup;

  constructor(public appFacade: AppFacade) { }

  // Закрыть модальное окно
  closeModalWindow() {
    this.appFacade.register([
      'Закрой модальное окно',
      false
    ]);
  }

  // Показать состояние модального окна
  getModalState() {
    return this.appFacade.register([
      'Покажи состояние модального окна',
      'state'
    ])
  }

  // Создание новых строк
  onAdd(row: Row) {
    // Добавляем новую сторку в списке рабочих смен
    this.addNewRow.emit(row);
  }

  // Обновление существующих строк
  onUpdate(row: Row) {
    // Комнада на удаление выше. Компонента App
    this.updateOldRow.emit(row);
  }

}
