import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './containers/filter/filter.component';
import { TableComponent } from './containers/table/table.component';
import { HeadTableComponent } from './containers/head-table/head-table.component';
import { BodyTableComponent } from './containers/body-table/body-table.component';
import { FormComponent } from './components/form/form.component';
import { ModalWindowComponent } from './containers/modal-window/modal-window.component';
import { AddNewRowButtonComponent } from './containers/add-new-row-button/add-new-row-button.component';
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
