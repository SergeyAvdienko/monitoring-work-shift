import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalculateSevice } from "./calculate.service";
import { Cell } from "./cellFactory.service";
import { FormatDateService } from "./formatDate.service";

// === Используется для предоставления методов обработки данных
// === Результаты полученные из Form превращаем в массив ячеек Cell[], который занесем в строку Row

@Injectable({
  providedIn: 'root'
})

export class CompileRowService {

  constructor(private formatDate: FormatDateService, private calculate: CalculateSevice,) { }

  compileRow(form: FormGroup) {

    const formData = { ...form.value };

    // Формируем все ячейки в один объект. По сути в строку Row
    const workShift: Cell[] = [
      { title: `${formData.workerMan}`, type: 'text' },
      { title: `${this.formatDate.formatDateTimeWorkShift(formData).start}`, type: 'date' },
      { title: `${this.formatDate.formatDateTimeWorkShift(formData).end}`, type: 'date' },
      { title: `${formData.cranType}`, type: 'text' },
      { title: `${this.calculate.calculationsWork(form).summOnload}`, type: 'summOnload' },
      { title: `${this.calculate.calculationsWork(form).summOffload}`, type: 'summOffload' },
      { title: `${this.calculate.calculationsWork(form).summWork}`, type: 'summWork' },
      { title: JSON.stringify(formData.firstCranWork), type: 'firstCran' },
      { title: JSON.stringify(formData.secondCranWork), type: 'secondCran' },
      { title: 'Редактировать', type: 'icon' },
      { title: 'Удалить', type: 'icon' },
    ];
    return workShift;
  }

}