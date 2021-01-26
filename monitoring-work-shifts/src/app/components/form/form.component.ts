import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CalculateSevice } from '../../services/calculate.service';
import { CompileRowService } from '../../services/compileRow.service';
import { DefaultService } from '../../services/defaultData.service';
import { FormService } from '../../services/form.service';
import { Http } from '../../services/http.service';
import { ModalStateService } from '../../services/modalState.service';
import { Row } from '../../services/rowFactory.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    DefaultService,
    FormService,
    CalculateSevice,
    Http,
    CompileRowService
  ]
})

export class FormComponent {

  //=== Исходящий поток

  // Передача в компонент App, чтобы перевести значение open в true 
  @Output() closeModal = new EventEmitter();
  // Передача в компонент App, чтобы добавить в массив rowsBody новую запись 
  @Output() onAdd = new EventEmitter();
  // Передача в компонент App, чтобы изменить существующую запись в массиве rowsBody 
  @Output() onUpdate = new EventEmitter();

  //=== Входящие данные

  // Данные спущены из App
  // this.form - заполнен данными всегда
  // this.id может быть '' || undefined, если форма открыта не для изменения существующей записи, а для создания новой
  @Input() id!: string;
  @Input() form!: FormGroup;

  // === 

  // Название модального окна
  title = 'Рабочая смена';

  // Меняет класс на кнопке <button class="button is-success" [ngClass]="{ 'is-loading': loading }" type="submit" ...
  loading: boolean = false;

  // Сброс подписки
  sub!: Subscription;

  constructor(
    public defaultService: DefaultService,
    public formService: FormService,
    public calculate: CalculateSevice,
    private http: Http,
    private modalState: ModalStateService,
    private compileRow: CompileRowService
  ) { }

  // Преобразовывае данные содержащиеся в FormArray
  // Дополнительно: исправляет ошибку c абстрактными данными при обработке FormArray
  getControls() {
    return {
      firstCran: this.form.get('firstCranWork') as FormArray,
      secondCran: this.form.get('secondCranWork') as FormArray
    }
  }

  // Отправляет данные на сервер
  submit() {

    // Покажем пользователю начало процесса отправки данных на сервер
    this.loading = true;

    // Достаем данные из формы и занесем в formData
    const formData = { ...this.form.value };

    // Передадим formData в сервис для обработки и вернем обратно
    const row: Row = {
      array: this.compileRow.compileRow(formData, this.form)
    }

    // Отправим данные на сервер
    this.id == '' ? this.createNewRow(row) : this.updateNewRow(row)

  }

  // Запускает цепь событий после сохранения на сервере новой строки (Row) в списке рабочих смен
  createNewRow(row: Row) {

    this.sub = this.http.setRowsBody(row)
      .subscribe(response => {
        // console.log(Response, response)
        response = row;

        // Передаем данные в родительский компонент
        this.send(response);
        // Закрываем модельное окно
        this.closeModalWindow();
        // Сбрасываем подписку на стрим
        this.sub.unsubscribe();

        // Возвращаем loading в исходное состояние
        this.loading = false;

      });
  }

  // Запускает цепь событий после изменения на сервере существующей строки (Row) в списке рабочих смен
  updateNewRow(row: Row) {

    this.sub = this.http.putRowsBody(row, this.id)
      .subscribe(response => {
        // console.log(Response, response)
        response = row;

        // Передаем данные в родительский компонент
        this.send(response)
        // Закрываем модельное окно
        this.closeModalWindow();
        // Сбрасываем подписку на стрим
        this.sub.unsubscribe();

        // Возвращаем loading в исходное состояние
        this.loading = false;
      })
  }

  // Передает в родительский компонент строку Row
  send(responce: Row) {
    if (this.id == '') {
      this.onAdd.emit(responce)
    } else {
      responce.id = this.id;
      this.onUpdate.emit(responce);
    }
  }

  // Передает в родительский компонент, что пора закрыть модальное окно
  closeModalWindow() {
    this.modalState.setModalState(false);
    this.resetForm();
  }

  // Сбрасывает данные в форме
  resetForm() {
    this.form = this.formService.createForm();
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }

}
