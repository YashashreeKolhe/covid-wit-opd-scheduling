import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ToastPopupComponent } from './toast-popup.component';

@NgModule({
  declarations: [
    ToastPopupComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  exports: [
    ToastPopupComponent
  ]
})
export class ToastModule { }
