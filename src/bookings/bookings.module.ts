import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ServicesModule } from 'src/services/services.module';

import { BookingsComponent } from './bookings.component';

@NgModule({
  declarations: [
    BookingsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServicesModule
  ],
  providers: [],
  exports: [
    BookingsComponent
  ]
})
export class BookingsModule { }
