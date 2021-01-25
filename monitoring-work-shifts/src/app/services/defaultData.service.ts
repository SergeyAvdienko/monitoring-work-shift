import { Injectable } from "@angular/core";
import { Row } from "./rowFactory.service";
@Injectable({
  providedIn: 'root'
})

export class DefaultService {

  // Массив данных для селектора выбора типа крана (options)
  defaultCranType = [{ type: 'Одинарный' }, { type: 'Двойной' }];

  // Массив данных для селектора выбора машины под погрузку/отгрузку
  defaultCarArray = [{ name: "Грузовик 1" }, { name: "Грузовик 2" }, { name: "Грузовик 3" }];

  // Предустановленное время начала и окончания смены
  defaultTime = { start: '08:00', end: '19:00' };


  // Базовые названия для столбцов в листе отображения рабочих смен
  defaultHearRow: Row[] = [
    {
      array: [
        { title: 'Фамилия и имя', type: 'text' },
        { title: 'Начало', type: 'text' },
        { title: 'Окончание', type: 'text' },
        { title: 'Тип крана', type: 'text' },
        { title: 'Погружено тонн', type: 'text' },
        { title: 'Редактировать', type: 'icon' },
        { title: 'Удалить', type: 'icon' }
      ]
    }
  ]

}