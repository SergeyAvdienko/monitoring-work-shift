import { Injectable } from "@angular/core";

// === Используется для хранения состояния различных объектов

@Injectable()

export class FormatDateService {

  // Объединение и форматирование данных formData.startTime/startDate/endTime/endDate
  formatDateTimeWorkShift(formData: any) {
    // Объединение данных из formData и возврат в формате Thu Jan 21 2021 10:00:00 GMT+0700 (Новосибирск, стандартное время)
    const joinTimeDate = (time: string, date: string) => {
      const d = date.split('-');
      const t = time.split(':');
      return new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]), Number(t[0]), Number(t[1]));
    }
    // Thu Jan 21 2021 10:00:00 GMT+0700 (Новосибирск, стандартное время) в миллисекунды
    const getMillisecond = (datetime: any) => datetime.getTime();
    // Возврат отформатированных данных 
    return {
      start: getMillisecond(joinTimeDate(formData.startTime, formData.startDate)),
      end: getMillisecond(joinTimeDate(formData.endTime, formData.endDate))
    }
  }

}