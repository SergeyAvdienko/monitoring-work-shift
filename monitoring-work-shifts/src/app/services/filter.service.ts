import { Injectable } from "@angular/core";
import { ValidateData } from "./validate.service";
@Injectable({
  providedIn: 'root'
})

export class FilterService {

  onSearch: string = '';

  // Обрабатывает value и возвращает после валидации
  // Например сейчас будут отфильтровываться символы ['/', '<', '>', '!', '=', '-', '"', '\'', '+', '?'] потому что они запрещены и фильтруются
  // для настройки следуйте в класс ValidateData

  validateStr() {

    let arrayLetter: Array<string> = this.onSearch.split('');
    let data: string = '';

    for (let index = 0; index < arrayLetter.length; index++) {
      const letter = arrayLetter[index];
      if (!new ValidateData().test(letter)) {
        data += arrayLetter[index]
      }
    }

    return data

  }

}