import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Row } from '../services/rowFactory.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent {

  // Сброс в компоненте App значение переменной open в значение false;
  @Output() closeModal = new EventEmitter();
  // Передача в компонент App, чтобы добавить в массив rowsBody новую запись 
  @Output() addNewRow = new EventEmitter();
  // Передача в компонент App, чтобы изменить существующую запись в массиве rowsBody
  @Output() updateOldRow = new EventEmitter();

  // Получает из компонента App. Добавляет/удаляет класс 'is-active'
  // [ngClass]="{ 'is-active': open }
  @Input() open!: boolean;

  // Также получает из App
  // this.form - заполнен данными всегда
  // this.id может быть '' || undefined, если форма открыта не для изменения существующей записи, а для создания новой
  @Input() id!: string;
  @Input() form!: FormGroup;

  // Закрыть модальное окно
  closeModalWindow() {
    // В родительском компоненте сбрасываются эти значения. Modal-table транзитный
    // this.open = false;
    // this.id = '';
    this.closeModal.emit(false);
  }

  // Создание новых строк
  onAdd(row: Row) {
    this.closeModalWindow();
    // Добавляем новую сторку в списке рабочих смен
    this.addNewRow.emit(row);
  }

  // Обновление существующих строк
  onUpdate(row: Row) {
    this.closeModalWindow();
    // Устанавливаем зановов параментр id в Row
    // Тип Row: [array: [], id: '']
    // Необходим для выборки из массива rowBody: Row
    row.id = this.id;
    // Комнада на удаление выше. Компонента App
    this.updateOldRow.emit(row);
  }

}
