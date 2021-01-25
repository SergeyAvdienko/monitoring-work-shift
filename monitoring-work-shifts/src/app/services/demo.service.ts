import { Injectable } from "@angular/core";
import { DecoratorRow } from "./decoratorRow.service";
import { Row } from "./rowFactory.service";

@Injectable()

export class DemoData {

  private demoArray: Row[] = [
    {
      array: [
        { title: 'Иванов И.И.', type: 'text' },
        { title: `${Date.now()}`, type: 'date' },
        { title: `${Date.now() + 1000 * 3600 * 12}`, type: 'date' },
        { title: 'Двойной', type: 'text' },
        { title: '10', type: 'summOnload' },
        { title: '0', type: 'summOffload' },
        { title: '10', type: 'summWork' },
        { title: JSON.stringify([{ name: 'Грузовик 1', onload: '5', offload: '2' }]), type: 'firstCran' },
        { title: JSON.stringify([{ name: 'Грузовик 2', onload: '5', offload: '0' }]), type: 'secondCran' },
        { title: 'Редактировать', type: 'icon' },
        { title: 'Удалить', type: 'icon' }
      ],
      id: `1`
    },
    {
      array: [
        { title: 'Петров П.П.', type: 'text' },
        { title: `${Date.now() - 1000 * 3600 * 3}`, type: 'date' },
        { title: `${Date.now() + 1000 * 3600 * 8}`, type: 'date' },
        { title: 'Одинарный', type: 'text' },
        { title: '0', type: 'summOnload' },
        { title: '10', type: 'summOffload' },
        { title: '10', type: 'summWork' },
        { title: JSON.stringify([{ name: 'Грузовик 1', onload: '5', offload: '2' }]), type: 'firstCran' },
        { title: JSON.stringify([{ name: '', onload: '0', offload: '0' }]), type: 'secondCran' },
        { title: 'Редактировать', type: 'icon' },
        { title: 'Удалить', type: 'icon' }
      ],
      id: `2`
    },
    {
      array: [
        { title: 'Сидоров С.С', type: 'text' },
        { title: `${Date.now() - 86400000}`, type: 'date' },
        { title: `${Date.now() + 86400000 + 3600000 * 12}`, type: 'date' },
        { title: 'Двойной', type: 'text' },
        { title: '0', type: 'summOnload' },
        { title: '0', type: 'summOffload' },
        { title: '0', type: 'summWork' },
        { title: JSON.stringify([{ name: '', onload: '', offload: '' }]), type: 'firstCran' },
        { title: JSON.stringify([{ name: '', onload: '', offload: '' }]), type: 'secondCran' },
        { title: 'Редактировать', type: 'icon' },
        { title: 'Удалить', type: 'icon' }
      ],
      id: `3`
    },
    {
      array: [
        { title: 'Петров П.П.', type: 'text' },
        { title: `${Date.now() - 2 * 86400000 - 3600000 * 3}`, type: 'date' },
        { title: `${Date.now() - 2 * 86400000 + 3600000 * 8}`, type: 'date' },
        { title: 'Двойной', type: 'text' },
        { title: '0', type: 'summOnload' },
        { title: '0', type: 'summOffload' },
        { title: '0', type: 'summWork' },
        { title: JSON.stringify([{ name: '', onload: '', offload: '' }]), type: 'firstCran' },
        { title: JSON.stringify([{ name: '', onload: '', offload: '' }]), type: 'secondCran' },
        { title: 'Редактировать', type: 'icon' },
        { title: 'Удалить', type: 'icon' }
      ],
      id: `4`
    }
  ];

  demo() {

    // return new DecoratorRow(this.demoArray).filterRow();
    return this.demoArray;

  }

}