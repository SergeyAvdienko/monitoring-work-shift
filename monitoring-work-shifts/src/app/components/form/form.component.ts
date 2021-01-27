import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppFacade } from 'src/app/app.facade';
import { Row } from '../../services/rowFactory.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    AppFacade
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
    private appFacade: AppFacade
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

    // Соберем строку нужного формата
    const row: Row = {
      array: this.appFacade.register([
        'Собери мне строку типа Row из данных полученных в FormData',
        this.form
      ])
    };

    // Отправим данные на сервер
    this.id == '' ? this.createNewRow(row) : this.updateNewRow(row)

  }

  // Запускает цепь событий после сохранения на сервере новой строки (Row) в списке рабочих смен
  createNewRow(row: Row) {

    this.sub = this.appFacade.register([
      'Создай новую строку типа Row в базе данных',
      row
    ])
      .subscribe((response: Row) => {

        // ===============================
        // console.log(Response, response)
        // Принудительно меняем response на row, так как сейчас приходящие с Api данные не соответствуют требуемым
        // Требует исправления после работы над слоем абстрации AppFacade
        // ===============================

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

    this.sub = this.appFacade.register([
      'Измени существующую строку типа Row в базе данных',
      row,
      this.id
    ])
      .subscribe((response: Row) => {

        // ===============================
        // console.log(Response, response)
        // Принудительно меняем response на row, так как сейчас приходящие с Api данные не соответствуют требуемым
        // Требует исправления после работы над слоем абстрации AppFacade
        // ===============================

        response = row;
        response.id = this.id;

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
  send(response: Row) {
    if (this.id == '') {
      this.onAdd.emit(response)
    } else {
      this.onUpdate.emit(response);
    }
  }

  // Передает в родительский компонент, что пора закрыть модальное окно
  closeModalWindow() {
    this.appFacade.register([
      'Закрой модальное окно',
      false
    ])
    this.resetForm();
  }

  // Сбрасывает данные в форме
  resetForm() {
    this.form = this.appFacade.register([
      'Создай новую форму'
    ]);
  }

  // Оптимизация рендеринга
  trackByFn(index: number, item: any) {
    index = index;
    return item.id;
  }

  // Добавить новую запись для второго крана
  addCarFirstCran() {
    return this.appFacade.register([
      'Создай для первого крана новую запись отгрузок/погрузок автомобиля',
      this.form,
      'First'
    ]);
  }

  // Добавить новую запись для второго крана
  addCarSecondCran() {
    return this.appFacade.register([
      'Создай для второго крана новую запись отгрузок/погрузок автомобиля',
      this.form,
      'Second'
    ]);
  }

  // Удалить запись для второго крана
  deleteCarFirstCran(i: number) {
    return this.appFacade.register([
      'Удали запись отгрузок/погрузок автомобиля для первого крана',
      this.form,
      i,
      'First'
    ]);
  }

  // Удалить запись для второго крана
  deleteCarSecondCran(i: number) {
    return this.appFacade.register([
      'Удали запись отгрузок/погрузок автомобиля для второго крана',
      this.form,
      i,
      'Second'
    ]);
  }

  // Посчитать сумму погрузок
  // calculate.calculationsWork(form).summOnload
  getSummOnload() {
    return this.appFacade.register([
      'Покажи мне сумму погрузок по всем учитываемым кранам',
      this.form,
      'onload'
    ]);
  }

  // Посчитать сумму огрузок
  // calculate.calculationsWork(form).summOffload
  getSummOffload() {
    return this.appFacade.register([
      'Покажи мне сумму отгрузок по всем учитываемым кранам',
      this.form,
      'offload'
    ]);
  }

  // Посчитать общую сумму
  // calculate.calculationsWork(form).summWork
  getSummWork() {
    return this.appFacade.register([
      'Покажи мне сумму всех погрузок/отгрузок по всем учитываемым кранам',
      this.form,
      'summWork'
    ]);
  }

  // Извлечь дефолтные значения для заполнения элемента Select (defaultService.defaultCarArray)
  getDefaultCarArray() {
    return this.appFacade.register([
      'Покажи мне дефолтные значения для заполнения элемента Select по типам автомобилей',
      'car'
    ]);
  }

  // Извлечь дефолтные значения для заполнения элемента Select (defaultService.defaultCranType)
  getDefaultCranType() {
    return this.appFacade.register([
      'Покажи мне дефолтные значения для заполнения элемента Select по типам кранов',
      'cran'
    ]);
  }

}
