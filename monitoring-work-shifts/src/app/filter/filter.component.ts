import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() onSearch = new EventEmitter();

  constructor() { }

  // Собирает вводимые символы с инпута и передает их в родительский компонент AppComponent
  onInput(event?: any) {
    const inputValue = (<HTMLInputElement>event?.target).value;
    this.onSearch.emit(inputValue);
  }

}
