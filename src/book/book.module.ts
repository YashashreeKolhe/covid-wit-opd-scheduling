import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ServicesModule } from 'src/services/services.module';

import { BookComponent } from './book.component';

@NgModule({
  declarations: [
    BookComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ServicesModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    BookComponent
  ]
})
export class BookModule { }
