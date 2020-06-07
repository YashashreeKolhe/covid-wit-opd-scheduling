import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appointment } from 'src/models/appointment';
//import {HttpClient, HttpClientModule, HttpHeaders, HttpHeaderResponse} from '@angular/common/http'
@Injectable({
  providedIn: 'root',
})
export class DataService  {
  visible: boolean;

  constructor(private http: HttpClient) { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  endpoint: string = 'http://localhost:8080';
  //'https://opd-scheduling-system.eu-gb.mybluemix.net';

  checkPatientLogin(username, password): Observable<boolean> {
    return this.http.post<boolean>(`${this.endpoint}/checkPatientLogin`, {
      emailId: username, 
      password: password
    });
  }

  submitRegistrationDetails(emailId, passowrd){
    var appointmentObj = {
      EmailId: emailId,
      Password:passowrd,
      PatientGender: '',
      PatientAge: -1,
      PatientIllness:'',
      PatientId: -1,
      PatientName: '',
      HospitalId: -1,
      DateString: '',
      Timeslot: '',
      MobileNumber: '',
      DoctorId: -1
    } as Appointment;
    return this.http.post<string>(`${this.endpoint}/setPatientData`, appointmentObj);
  }
  
  checkAdminLogin(emailId, password): Observable<boolean> {
    return this.http.post<boolean>(`${this.endpoint}/checkAdminLogin`, {
      emailId: emailId, password: password
    });
  }
}
