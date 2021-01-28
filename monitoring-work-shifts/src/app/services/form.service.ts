import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cell } from "./cellFactory.service";
import { DefaultService } from "./defaultData.service";

@Injectable({
  providedIn: 'root'
})

export class FormService {

  constructor(private fb: FormBuilder, private defaultService: DefaultService) { }

  updateForm(cell: Cell[]) {

    return this.fb.group({
      workerMan: [`${cell[0].title}`, [Validators.required, Validators.maxLength(50)]],
      startTime: [`${new Date(Number(cell[1].title)).toTimeString().slice(0, 5)}`, Validators.required],
      startDate: [`${new Date(Number(cell[1].title)).toISOString().slice(0, 10)}`, Validators.required],
      endTime: [`${new Date(Number(cell[2].title)).toTimeString().slice(0, 5)}`, Validators.required],
      endDate: [`${new Date(Number(cell[2].title)).toISOString().slice(0, 10)}`, Validators.required],
      cranType: [`${cell[3].title}`, Validators.required],
      firstCranWork: this.fb.array([]),
      secondCranWork: this.fb.array([])
    });

  }

  // Заполнаяет реактивную форму this.form
  // Validators - встроенный валидатор
  // myValidators - собственный валидатор
  createForm() {
    return this.fb.group({
      workerMan: [null, [Validators.required, Validators.maxLength(50)]],
      startTime: [`${this.defaultService.defaultTime.start}`, Validators.required],
      startDate: [`${new Date().toISOString().slice(0, 10)}`, Validators.required],
      endTime: [`${this.defaultService.defaultTime.end}`, Validators.required],
      endDate: [`${new Date().toISOString().slice(0, 10)}`, Validators.required],
      cranType: ['', Validators.required],
      firstCranWork: this.fb.array([]),
      secondCranWork: this.fb.array([])
    });
  }

  // Добавляет данные в FormArray - firstCranWork
  addCarFirstCran(form: FormGroup, array: string = ''): void {
    if (array === '') {
      (<FormArray>form.controls['firstCranWork']).push(this.newFormGroup());
    } else {
      JSON.parse(array).forEach((element: any) => {
        (<FormArray>form.controls['firstCranWork']).push(this.fb.group({
          name: new FormControl(element.name), // Грузовик 1, Грузовик 2 ....
          onload: new FormControl(element.onload),
          offload: new FormControl(element.offload)
        }));
      });
    }
  };

  // Добавляет данные в FormArray - secondCranWork;
  addCarSecondCran(form: FormGroup, array: string = ''): void {
    if (array === '') {
      (<FormArray>form.controls['secondCranWork']).push(this.newFormGroup());
    } else {
      JSON.parse(array).forEach((element: any) => {
        (<FormArray>form.controls['secondCranWork']).push(this.fb.group({
          name: new FormControl(element.name), // Грузовик 1, Грузовик 2 ....
          onload: new FormControl(element.onload),
          offload: new FormControl(element.offload)
        }));
      });
    }
  };

  // Шаблон данных для заполнения FormArray (используется addCarFirstCran/addCardSecondCran)
  newFormGroup() {
    const newGroup = this.fb.group({
      name: '', // Грузовик 1, Грузовик 2 ....
      onload: '',
      offload: ''
    })
    return newGroup;
  }

  // Удаление элемента
  deleteFirstCran(form: FormGroup, index: number) {
    (<FormArray>form.controls['firstCranWork']).removeAt(index);
  }
  deleteSecondCran(form: FormGroup, index: number) {
    (<FormArray>form.controls['secondCranWork']).removeAt(index);
  }

}