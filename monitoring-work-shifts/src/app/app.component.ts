import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DemoData } from './services/demo.service';
import { FilterService } from './services/filter.service';
import { FormService } from './services/form.service';
import { Http } from './services/http.service';
import { Row } from './services/rowFactory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FilterService,
    Http,
    DemoData,
    FormService
  ]
})

export class AppComponent implements OnInit {

  // Доступ к прогресс бару, как HTML--эелементу
  @ViewChild('progress', { static: false })
  progressRef!: ElementRef;

  // Ошибка при запросе на сервер
  error!: string;

  title = 'Список рабочих смен';

  // Данные принимаемые от Inputа в компоненте Filter 
  // Обеспечиваем работу pipes/filter.pipes
  // использую внутри компонента App для сортировки списка рабочих смен по ячейкам Cell[] и строкам Row
  onSearch: string = '';

  // Массив с данными для заполнения списка рабочих смен
  // Спускается в 
  rowsBody: Row[] = [];

  // id сроки Row. Используется для поиска нужной строки в массиве
  // Определяет сценарий формы
  // Спускается в
  id: string = '';

  // Флаг открыта/закрыта форма
  // Спускается в
  open!: boolean;

  // Данные для рекативной формы
  // Спускается в
  form!: FormGroup;

  constructor(private filterService: FilterService, private http: Http, private demo: DemoData, private formService: FormService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // 
    this.createRow()

    this.http.getRowsBody()
      .subscribe(response => {

        // console.log('Response', response)

        // Так как данные с сервера не подходят для нас, присоеденим демо-массив
        // Редактирование демо-массива. Используйте сервис DemoData
        this.rowsBody = this.demo.demo();

      }, error => {
        // Не стал прописывать работу с ошибками по всему приложению
        this.error = 'Произошла ошибка при получении информации с сервера. Приносим извинения за доставленные неудобства'
      })

  }

  // Передает валидированное значение в компонент Table
  // Передача происходит <app-table [onSearch]="onSearch"></app-table> 
  filter(event: any) {
    this.onSearch = this.filterService.validateStr(event);
  }

  // Передает значение в modalWindow
  // Открыть модальное окно после клика на кнопку в компоненте add-new-row-button
  openModal(value: boolean) {
    if (this.id == '') {
      // Сценарий CreateRow
      this.open = value;
      this.createRow();
    } else {
      // Сценарий UpdateRow
      this.open = value;
    }
  }

  // Сообщает о закрытии модального окна в компоненте modalWindow
  // Сбрасывает в false значение this.open
  // Сбрасывает в '' значение this.id
  closeModal(value: boolean) {
    this.id = '';
    this.open = value;
  }

  // Добавляет в массив this.rowsBody: Row[] строку row: Row из компонента Form 
  addNewRow(row: Row) {
    // Так как id не может быть сгенерировано сервером, то делаем собственное
    const id = this.rowsBody.length + 1;
    // Присваиваем id строке Row
    row.id = `${id}`;
    // Последняя запись вверху списка рабочих смен
    this.rowsBody.unshift(row);
  }

  // Меняет в массиве this.rowsBody: Row[] строку row: Row из компонента Form
  addOldRow(row: Row) {
    // Приходит из Form, транзитом через ModalWindow
    this.rowsBody.forEach(rows => {
      if (rows.id === row.id) {
        // Тип Row: [array: [], id: '']
        rows.array = row.array;
        return;
      }
    })
  }

  // Выбирает строку, которую нужно удалять и делает это после ответа сервера
  deleteRow(id: any) {

    // Информируем пользователя о ходе процесса 
    const countStep = 5;
    const timeStep = 150;

    const incrValue = setInterval(() => {
      this.progressRef.nativeElement.value += countStep;
    }, timeStep);

    this.http.deleteRowsBody(id)
      .subscribe(() => {
        this.rowsBody = this.rowsBody.filter(row => row.id !== id);
        this.progressRef.nativeElement.value = 100;
        // Удаляем setinterval
        clearInterval(incrValue);
        // Обновляем значение
        setTimeout(() => {
          this.progressRef.nativeElement.value = 0;
        }, 500);
      }, error => {
        this.error = 'Произошла ошибка при удалении рабочей смены. Приносим извинения за доставленные неудобства'
      });

  }

  // Создает строку (Row), которая попадет в список рабочх смен
  createRow() {

    // Все данные по дефолту. Принцип заполнения в this.updateRow
    // Подробности в this.formService
    this.form = this.formService.createForm();
    this.formService.addCarFirstCran(this.form);
    this.formService.addCarSecondCran(this.form);

    // console.log({ ...this.form.value })

  }

  // Выбирает строку (Row), которую нужно редактировать
  updateRow(id: any) {

    this.rowsBody.forEach(row => {

      if (row.id == id) {
        // Тип Row: [array: [], id: '']
        // Нужную строку помещаем в cell из нее наполняем this.form
        let cell = row.array

        this.form = this.formService.updateForm(cell);

        // Завершаем наполнение данными FormArray: firstCran (какие машины грзились первым краном)
        JSON.parse(cell[7].title).forEach((element: any) => {
          (<FormArray>this.form.controls['firstCranWork']).push(this.fb.group({
            name: new FormControl(element.name), // Грузовик 1, Грузовик 2 ....
            onload: new FormControl(element.onload),
            offload: new FormControl(element.offload)
          }));
        });

        // грузились вторым краном
        JSON.parse(cell[8].title).forEach((element: any) => {
          (<FormArray>this.form.controls['secondCranWork']).push(this.fb.group({
            name: new FormControl(element.name), // Грузовик 1, Грузовик 2 ....
            onload: new FormControl(element.onload),
            offload: new FormControl(element.offload)
          }));
        });

        // Фиксируем this.id и спускаем вместе с this.form и вместе c this.open в MadalWindow
        this.id = id;
        this.openModal(true);

        return;
      };

    })
  }

}
