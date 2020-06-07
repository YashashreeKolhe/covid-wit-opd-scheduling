import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';
import { Emergency } from 'src/models/emergency';

@Injectable()
export class DoctorService {
  endpoint: string = 'https://opd-scheduling-system.eu-gb.mybluemix.net';
  //endpoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getDoctorsList(hospitalId: number): Observable<Doctor[]> {
    // return [
    //   { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
    //   { 'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
    // ];
    return this.http.get<Doctor[]>(`${this.endpoint}/getDoctorList`, {
      params: {
        hospitalId: hospitalId.toString()
      }
    });
  }

  saveDoctorDetails(doctor: Doctor): Observable<any> {
    return this.http.post<Doctor>(`${this.endpoint}/`, doctor);
  }

  pushPatientsAndNotify(emergency: Emergency): Observable<string> {
    return this.http.get<string>(`${this.endpoint}/pushAppointments`, {
      params: {
        doctorId: emergency.DoctorId.toString(),
        fromStr: emergency.UnavailableFrom,
        toStr: emergency.UnavailableTo,
        date: emergency.DateString.toString()
      }
    });
  }
}