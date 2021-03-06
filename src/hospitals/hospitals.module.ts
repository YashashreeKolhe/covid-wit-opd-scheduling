import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AgGridModule } from 'ag-grid-angular';

import { EnrolledHospitalsComponent } from './enrolled-hospitals.component';

@NgModule({
  declarations: [
    EnrolledHospitalsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AgGridModule
  ],
  providers: [],
  exports: [
    EnrolledHospitalsComponent
  ]
})
export class HospitalsModule { }
