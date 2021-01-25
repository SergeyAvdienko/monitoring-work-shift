import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })

export class ValidateData {

  blockedCharacters: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  resolution: boolean = false;

  // Отвечает на вопрос содержится ли в строке символ, как в массиве blockedCharacters
  // возвращает true/false
  test(letter: string = '') {
    this.resolution = this.blockedCharacters.includes(letter);
    return this.resolution;
  }

}