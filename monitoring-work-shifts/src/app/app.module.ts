import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { HeadTableComponent } from './head-table/head-table.component';
import { BodyTableComponent } from './body-table/body-table.component';
import { FormComponent } from './form/form.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { AddNewRowButtonComponent } from './add-new-row-button/add-new-row-button.component';
import { FilterPipe } from './pipes/filter.pipes';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    TableComponent,
    HeadTableComponent,
    BodyTableComponent,
    FormComponent,
    ModalWindowComponent,
    AddNewRowButtonComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
