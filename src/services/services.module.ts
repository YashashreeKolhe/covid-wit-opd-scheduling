import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DoctorService } from './doctor-service.service';
import { AppointmentService } from './appointment-service.service';
import { HospitalService } from './hospital-service.service';

@NgModule({
 imports: [
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    DoctorService,
    AppointmentService,
    HospitalService
  ],
  exports: [
  ]
})
export class ServicesModule { }
