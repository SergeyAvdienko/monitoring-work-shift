import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppFacade } from './app.facade';
import { Row } from './services/rowFactory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppFacade
  ]
})

export class AppComponent implements OnInit {

  // Доступ к прогресс бару, как HTML--эелементу
  @ViewChild('progress', { static: false })
  progressRef!: ElementRef;

  // Ошибка при запросе на сервер
  error!: string;

  title = 'Список рабочих смен';

  // Массив с данными для заполнения списка рабочих смен
  // Спускается в app-table
  rowsBody: Row[] = [];

  // id сроки Row. Используется для поиска нужной строки в массиве
  // Определяет сценарий формы
  // Спускается в компонент modal-vindow
  id: string = '';

  // Данные для рекативной формы
  // Спускается в компонент modal-vindow
  form!: FormGroup;

  // Сброс подписки на стрим
  sub!: Subscription;

  constructor(private appFacade: AppFacade) { }

  ngOnInit(): void {

    this.createRow();

    this.sub = this.appFacade.register([
      'Покажи исходные данные для отображения в таблице',
    ])
      .subscribe((response: any) => {

        // console.log('Response', response)

        // Так как данные с сервера не подходят для нас, присоеденим демо-массив
        // Редактирование демо-массива. Используйте сервис DemoData

        this.rowsBody = this.appFacade.register([
          'Загрузи демо массив с данными для отображения в таблице'
        ])

        // Сброс подписки на стрим
        this.sub.unsubscribe();

      }, (error: any) => {
        // Не стал прописывать работу с ошибками по всему приложению
        this.error = 'Произошла ошибка при получении информации с сервера. Приносим извинения за доставленные неудобства'
      })

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

    this.sub = this.appFacade.register([
      'Удали существующую строку типа Row в базе данных',
      id
    ])
      .subscribe(() => {
        this.rowsBody = this.rowsBody.filter(row => row.id !== id);
        this.progressRef.nativeElement.value = 100;
        // Удаляем setinterval
        clearInterval(incrValue);
        // Обновляем значение
        setTimeout(() => {
          this.progressRef.nativeElement.value = 0;
          // Сброс подписки на стрим
          this.sub.unsubscribe();
        }, 500);
      }, (error: any) => {
        this.error = 'Произошла ошибка при удалении рабочей смены. Приносим извинения за доставленные неудобства'
      });

  }

  // Создает строку (Row), которая попадет в список рабочх смен
  createRow() {

    // Обнуляем id
    if (this.id != '' || !this.id) {
      this.id = '';
    }

    this.form = this.appFacade.register([
      'Создай новую форму'
    ]);

    this.appFacade.register([
      'Создай для первого крана новую запись отгрузок/погрузок автомобиля',
      this.form,
      'First'
    ]);

    this.appFacade.register([
      'Создай для второго крана новую запись отгрузок/погрузок автомобиля',
      this.form,
      'Second'
    ]);

  }

  // Выбирает строку (Row), которую нужно редактировать
  updateRow(id: any) {

    this.rowsBody.forEach(row => {

      // Фиксируем this.id и спускаем вместе с this.form и вместе c this.open в MadalWindow
      this.id = id;

      if (row.id == id) {

        this.form = this.appFacade.register([
          'Обнови форму заполнив ее предоставленными данными',
          row.array
        ]);

        this.appFacade.register([
          'Создай для первого крана новую запись отгрузок/погрузок автомобиля',
          this.form,
          row.array[7].title,
          'First'
        ]);

        this.appFacade.register([
          'Создай для второго крана новую запись отгрузок/погрузок автомобиля',
          this.form,
          row.array[8].title,
          'Second'
        ]);

        this.appFacade.register([
          'Открой модальное окно',
          true
        ])

        return;
      };

    })
  }

}
