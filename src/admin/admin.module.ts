import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { ServicesModule } from 'src/services/services.module';
import { AdminLandingComponent } from './admin-landing.component';
import { WalkinBookingComponent } from './walkin-booking.component';

@NgModule({
  declarations: [
    AdminLandingComponent,
    WalkinBookingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ServicesModule,
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    BsModalRef
  ],
  exports: [
    AdminLandingComponent,
    WalkinBookingComponent
  ]
})
export class AdminModule { }
