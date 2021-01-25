import { Injectable } from "@angular/core";

// === Используется для хранения состояния различных объектов

@Injectable({ providedIn: 'root' })

export class ModalStateService {

  // модальное окно
  open: boolean = false;

  getModalState() {
    return this.open;
  }

  setModalState(value: boolean) {
    this.open = value;
  }

}