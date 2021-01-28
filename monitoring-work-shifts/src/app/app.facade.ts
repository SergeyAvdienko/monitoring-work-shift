// Публичный интерфейс для взаимодействия уровня представления (Компонентов) с бизнес-логикой (Сервисы)
// Используется, как уровень абстракции на базе дизайн паттерна Facade

import { Injectable } from "@angular/core";
import { CalculateSevice } from "./services/calculate.service";
import { CellFactory } from "./services/cellFactory.service";
import { CompileRowService } from "./services/compileRow.service";
import { DefaultService } from "./services/defaultData.service";
import { DemoDataService } from "./services/demo.service";
import { FilterService } from "./services/filter.service";
import { FormService } from "./services/form.service";
import { Http } from "./services/http.service";
import { ModalStateService } from "./services/modalState.service";

class Facade {

  service!: any;
  requestArray!: any[];

  constructor(service: any, requestArray: Array<any>) {
    this.service = service;
    this.requestArray = requestArray
  }

  // Ответ
  reply(requestArray: Array<any>) { }

  // Взять запрос в обработку
  addRequest() {
    return this.reply(this.requestArray);
  }

}

class CompileRowFacade extends Facade {
  reply() {
    return this.service.compileRow(this.requestArray[1]);
  }
}

class TableFacade extends Facade {
  reply() {
    return this.service.getTable();
  }
}

class AddRowFacade extends Facade {
  reply() {
    return this.service.addRowsBody(this.requestArray[1]);
  }
}

class UpdateRowFacade extends Facade {
  reply() {
    return this.service.putRowsBody(this.requestArray[1], this.requestArray[2]);
  }
}

class DeleteRowFacade extends Facade {
  reply() {
    return this.service.deleteRowsBody(this.requestArray[1]);
  }
}

class WindowFacade extends Facade {
  reply() {
    if (this.requestArray[1] === 'state') return this.service.getModalState();
    return this.service.setModalState(this.requestArray[1]);
  }
}

class FormCreate extends Facade {
  reply() {
    return this.service.createForm();
  }
}

class FormUpdate extends Facade {
  reply() {
    return this.service.updateForm(this.requestArray[1]);
  }
}

class AddCar extends Facade {
  reply() {
    if (this.requestArray[3]) {
      if (this.requestArray[3] === 'First') return this.service.addCarFirstCran(this.requestArray[1], this.requestArray[2])
      if (this.requestArray[3] === 'Second') return this.service.addCarSecondCran(this.requestArray[1], this.requestArray[2])
    } else {
      if (this.requestArray[2] === 'First') return this.service.addCarFirstCran(this.requestArray[1])
      if (this.requestArray[2] === 'Second') return this.service.addCarSecondCran(this.requestArray[1])
    }
  }
}

class DeleteCar extends Facade {
  reply() {
    if (this.requestArray[3] === 'First') return this.service.deleteFirstCran(this.requestArray[1], this.requestArray[2])
    if (this.requestArray[3] === 'Second') return this.service.deleteSecondCran(this.requestArray[1], this.requestArray[2])
  }
}

class Summ extends Facade {
  reply() {
    if (this.requestArray[2] === 'onload') return this.service.calculationsWork(this.requestArray[1]).summOnload
    if (this.requestArray[2] === 'offload') return this.service.calculationsWork(this.requestArray[1]).summOffload
    if (this.requestArray[2] === 'summWork') return this.service.calculationsWork(this.requestArray[1]).summWork
  }
}

class Default extends Facade {
  reply() {
    if (this.requestArray[1] === 'car') return this.service.getCarArray()
    if (this.requestArray[1] === 'cran') return this.service.getCranType()
    if (this.requestArray[1] === 'headRow') return this.service.getHeadRow()
    if (this.requestArray[1] === 'timeWorkShift') return this.service.getHeadRow()
  }
}

class CellUpgrade extends Facade {
  reply() {
    return this.service.create(this.requestArray[1], this.requestArray[2])
  }
}

class Filter extends Facade {
  reply() {
    return this.service.validateStr()
  }
}

class Demo extends Facade {
  reply() {
    return this.service.demo();
  }
}

@Injectable()

export class AppFacade {

  answer!: any;

  constructor(
    private compileRowService: CompileRowService,
    private httpService: Http,
    private modalStateService: ModalStateService,
    private formService: FormService,
    private defaultService: DefaultService,
    private calculateSevice: CalculateSevice,
    private cellFactory: CellFactory,
    private filterService: FilterService,
    private demoService: DemoDataService
  ) { }

  register(requestArray: Array<any>) {

    switch (requestArray[0]) {
      case 'Собери мне строку типа Row из данных полученных в FormData':
        this.answer = new CompileRowFacade(this.compileRowService, requestArray)
        break;
      case 'Покажи исходные данные для отображения в таблице':
        this.answer = new TableFacade(this.httpService, requestArray)
        break;
      case 'Создай новую строку типа Row в базе данных':
        this.answer = new AddRowFacade(this.httpService, requestArray)
        break;
      case 'Измени существующую строку типа Row в базе данных':
        this.answer = new UpdateRowFacade(this.httpService, requestArray)
        break;
      case 'Удали существующую строку типа Row в базе данных':
        this.answer = new DeleteRowFacade(this.httpService, requestArray)
        break;
      case 'Закрой модальное окно':
        this.answer = new WindowFacade(this.modalStateService, requestArray)
        break;
      case 'Открой модальное окно':
        this.answer = new WindowFacade(this.modalStateService, requestArray)
        break;
      case 'Покажи состояние модального окна':
        this.answer = new WindowFacade(this.modalStateService, requestArray)
        break;
      case 'Создай новую форму':
        this.answer = new FormCreate(this.formService, requestArray)
        break;
      case 'Обнови форму заполнив ее предоставленными данными':
        this.answer = new FormUpdate(this.formService, requestArray)
        break;
      case 'Создай для первого крана новую запись отгрузок/погрузок автомобиля':
        this.answer = new AddCar(this.formService, requestArray)
        break;
      case 'Создай для второго крана новую запись отгрузок/погрузок автомобиля':
        this.answer = new AddCar(this.formService, requestArray)
        break;
      case 'Удали запись отгрузок/погрузок автомобиля для первого крана':
        this.answer = new DeleteCar(this.formService, requestArray)
        break;
      case 'Удали запись отгрузок/погрузок автомобиля для второго крана':
        this.answer = new DeleteCar(this.formService, requestArray)
        break;
      case 'Покажи мне сумму погрузок по всем учитываемым кранам':
        this.answer = new Summ(this.calculateSevice, requestArray)
        break;
      case 'Покажи мне сумму отгрузок по всем учитываемым кранам':
        this.answer = new Summ(this.calculateSevice, requestArray)
        break;
      case 'Покажи мне сумму всех погрузок/отгрузок по всем учитываемым кранам':
        this.answer = new Summ(this.calculateSevice, requestArray)
        break;
      case 'Покажи мне дефолтные значения для заполнения элемента Select по типам автомобилей':
        this.answer = new Default(this.defaultService, requestArray)
        break;
      case 'Покажи мне дефолтные значения для заполнения элемента Select по типам кранов':
        this.answer = new Default(this.defaultService, requestArray)
        break;
      case 'Покажи мне дефолтные значения для заполнения шапки таблицы':
        this.answer = new Default(this.defaultService, requestArray)
        break;
      case 'Покажи мне дефолтные значения для заполнения времени начала и окончания смены':
        this.answer = new Default(this.defaultService, requestArray)
        break;
      case 'Обработай ячейку Cell с помощью паттерна Factory':
        this.answer = new CellUpgrade(this.cellFactory, requestArray)
        break;
      case 'Валидируй символы в строке':
        this.answer = new Filter(this.filterService, requestArray)
        break;
      case 'Загрузи демо массив с данными для отображения в таблице':
        this.answer = new Demo(this.demoService, requestArray)
        break;

      default:
        console.log('Нет запрашиваемого Фасада')
        break;
    }

    return this.answer.addRequest()

  }

}