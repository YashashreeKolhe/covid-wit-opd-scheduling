import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { EnrolledHospitalsComponent } from './enrolled-hospitals.component';

@NgModule({
  declarations: [
    EnrolledHospitalsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  exports: [
    EnrolledHospitalsComponent
  ]
})
export class HospitalsModule { }
