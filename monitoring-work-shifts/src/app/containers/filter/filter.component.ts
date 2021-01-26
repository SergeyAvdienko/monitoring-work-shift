import { Component, EventEmitter, Output } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() onSearch = new EventEmitter();

  constructor(private filterService: FilterService) { }

  // Собирает вводимые символы с инпута и передает их в родительский компонент AppComponent
  onInput(event?: any) {
    const inputValue = (<HTMLInputElement>event?.target).value;
    this.filterService.onSearch = inputValue;
  }

}
