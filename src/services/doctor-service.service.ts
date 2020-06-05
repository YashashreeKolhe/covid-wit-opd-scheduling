import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';

@Injectable()
export class DoctorService {

  constructor(private http: HttpClient) { }

  // getDoctorsList(hospitalId: number): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(`/doctors/${hospitalId}`);
  // }

  getDoctorsList(hospitalId: number): Doctor[] {
    return [
      { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
      { 'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
    ];
  }

  saveDoctorDetails(doctor: Doctor) {
    this.http.post<Doctor>('/doctors', doctor);
  }
}