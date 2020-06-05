import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';
import { Hospital } from 'src/models/hospital';

@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) { }

  // getDoctorsList(hospitalId: number): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(`/doctors/${hospitalId}`);
  // }

  getHospitalDetails(hospitalId: number): Hospital {
    return { 'HospitalId': 1, 'DoctorsList': 
    [
      { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
      {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
    ],  SlotDurationInMinutes: 30 };
  }

  getHospitals(): Hospital[] {
    return [
      { 'HospitalId': 1, 'DoctorsList': 
        [
          { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
          {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
        ],  SlotDurationInMinutes: 30 },
    { 'HospitalId': 2, 'DoctorsList': 
        [
          { 'DoctorId': 1, 'DoctorName': 'Dr. LMN', 'DoctorSpeciality': 'ENT' },
          {'DoctorId': 2, 'DoctorName': 'Dr. OPQ', 'DoctorSpeciality': 'Paediatric' }
        ],  SlotDurationInMinutes: 30 },
    { 'HospitalId': 3, 'DoctorsList': 
        [
          { 'DoctorId': 1, 'DoctorName': 'Dr. STU', 'DoctorSpeciality': 'ENT' },
          {'DoctorId': 2, 'DoctorName': 'Dr. VWX', 'DoctorSpeciality': 'Paediatric' }
        ],  SlotDurationInMinutes: 30 },
    { 'HospitalId': 1, 'DoctorsList': 
        [
          { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
          {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
        ],  SlotDurationInMinutes: 30 }
    ];
  }
}