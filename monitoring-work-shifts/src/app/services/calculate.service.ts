import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class CalculateSevice {

  constructor() { }

  // Расчет отгрузок, погрузок в динамике и при отправке данных на сервер
  calculationsWork(form: FormGroup) {

    // Достаем данные из формы
    const formData = { ...form.value };

    // Сумма погрузок
    const summOnload = (cranWork: Array<any>) => {
      let summ = 0;
      cranWork.forEach(element => {
        summ += Number(element.onload);
      });
      return summ
    }

    // Сумма отгрузок
    const summOffload = (cranWork: Array<any>) => {
      let summ = 0;
      cranWork.forEach(element => {
        summ += Number(element.offload);
      });
      return summ
    }

    const SummOnload = summOnload(formData.firstCranWork) + summOnload(formData.secondCranWork);
    const SummOffload = summOffload(formData.firstCranWork) + summOffload(formData.secondCranWork);
    const SummWork = SummOnload + SummOffload;

    return { summOnload: SummOnload, summOffload: SummOffload, summWork: SummWork }
  }

}