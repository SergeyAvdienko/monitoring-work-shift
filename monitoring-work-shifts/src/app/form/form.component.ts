import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CalculateSevice } from '../services/calculate.service';
import { Cell } from '../services/cellFactory.service';
import { DefaultService } from '../services/defaultData.service';
import { FormService } from '../services/form.service';
import { FormatDateService } from '../services/formatDate.service';
import { Http } from '../services/http.service';
import { ModalStateService } from '../services/modalState.service';
import { Row } from '../services/rowFactory.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    DefaultService,
    FormService,
    CalculateSevice,
    Http,
    FormatDateService
  ]
})

export class FormComponent {

  // Передача в компонент App, чтобы перевести значение open в true 
  @Output() closeModal = new EventEmitter();
  // Передача в компонент App, чтобы добавить в массив rowsBody новую запись 
  @Output() onAdd = new EventEmitter();
  // Передача в компонент App, чтобы изменить существующую запись в массиве rowsBody 
  @Output() onUpdate = new EventEmitter();

  // Данные спущены из App
  // this.form - заполнен данными всегда
  // this.id может быть '' || undefined, если форма открыта не для изменения существующей записи, а для создания новой
  @Input() id!: string;
  @Input() form!: FormGroup;

  // Название модального окна
  title = 'Рабочая смена';

  // Меняет класс на кнопке <button class="button is-success" [ngClass]="{ 'is-loading': loading }" type="submit" ...
  loading: boolean = false;

  constructor(
    public defaultService: DefaultService,
    public formService: FormService,
    public calculate: CalculateSevice,
    private http: Http,
    private modalState: ModalStateService,
    private formatDate: FormatDateService
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

    // Достаем данные из формы
    const formData = { ...this.form.value };

    // Формируем все ячейки в один объект. По сути в строку Row
    const workShift: Cell[] = [
      { title: `${formData.workerMan}`, type: 'text' },
      { title: `${this.formatDate.formatDateTimeWorkShift(formData).start}`, type: 'date' },
      { title: `${this.formatDate.formatDateTimeWorkShift(formData).end}`, type: 'date' },
      { title: `${formData.cranType}`, type: 'text' },
      { title: `${this.calculate.calculationsWork(this.form).summOnload}`, type: 'summOnload' },
      { title: `${this.calculate.calculationsWork(this.form).summOffload}`, type: 'summOffload' },
      { title: `${this.calculate.calculationsWork(this.form).summWork}`, type: 'summWork' },
      { title: JSON.stringify(formData.firstCranWork), type: 'firstCran' },
      { title: JSON.stringify(formData.secondCranWork), type: 'secondCran' },
      { title: 'Редактировать', type: 'icon' },
      { title: 'Удалить', type: 'icon' },
    ];

    // const printConsoleArrayWorkShift = () => {
    //   workShift.forEach(element => {
    //     console.log(element.title + " " + element.type)
    //   });
    // }
    // Вывести массив workShift в консоль
    // printConsoleArrayWorkShift();

    // Запишем сформированный объект в Row
    const row: Row = {
      array: workShift
    };

    // Отправим данные на сервер
    this.id == '' ? this.createNewRow(row) : this.updateNewRow(row)

  }

  // Запускает цепь событий после сохранения на сервере новой строки (Row) в списке рабочих смен
  createNewRow(row: Row) {

    this.http.setRowsBody(row)
      .subscribe(response => {
        // console.log(Response, response)
        response = row;

        // Передаем данные в родительский компонент
        this.send(response)
        // Закрываем модельное окно
        this.closeModalWindow();

        // Возвращаем loading в исходное состояние
        this.loading = false;

      });
  }

  // Запускает цепь событий после изменения на сервере существующей строки (Row) в списке рабочих смен
  updateNewRow(row: Row) {
    this.http.putRowsBody(row, this.id)
      .subscribe(response => {
        // console.log(Response, response)
        response = row;

        // Передаем данные в родительский компонент
        this.send(response)
        // Закрываем модельное окно
        this.closeModalWindow();

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
    this.id = '';
    this.form = this.formService.createForm();
  }


}
