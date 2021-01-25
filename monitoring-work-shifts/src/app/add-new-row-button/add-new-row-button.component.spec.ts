import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRowButtonComponent } from './add-new-row-button.component';

describe('AddNewRowButtonComponent', () => {
  let component: AddNewRowButtonComponent;
  let fixture: ComponentFixture<AddNewRowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRowButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
