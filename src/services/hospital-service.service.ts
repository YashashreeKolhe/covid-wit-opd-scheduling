import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';
import { Hospital } from 'src/models/hospital';

@Injectable()
export class HospitalService {
  endpoint: string = 'https://opd-scheduling-system.eu-gb.mybluemix.net';
  //endpoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getDoctorList(hospitalId: number): Observable<Doctor[]> {
    // return [
    //   { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT', 'OPDStartTimeString': '11:00:00 AM', 'OPDEndTimeString': '1:00:00 PM' },
    //   {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric', 'OPDStartTimeString': '11:00:00 AM', 'OPDEndTimeString': '1:00:00 PM' }
    // ];
    return this.http.get<Doctor[]>(`${this.endpoint}/getDoctorList`, {
      params: {
        hospitalId: hospitalId.toString()
      }
    });
  }

  getHospitals(): Observable<any> {
    // return [
    //   { 'HospitalId': 1, 'HospitalName': 'KEM Hospital', 'DoctorsList': 
    //     [
    //       { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
    //       {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
    //     ],  SlotDurationInMinutes: 30 },
    // { 'HospitalId': 2, 'HospitalName': 'Dhanwantari Hospital', 'DoctorsList': 
    //     [
    //       { 'DoctorId': 1, 'DoctorName': 'Dr. LMN', 'DoctorSpeciality': 'ENT' },
    //       {'DoctorId': 2, 'DoctorName': 'Dr. OPQ', 'DoctorSpeciality': 'Paediatric' }
    //     ],  SlotDurationInMinutes: 30 },
    // { 'HospitalId': 3, 'HospitalName': 'Ruby Hospital', 'DoctorsList': 
    //     [
    //       { 'DoctorId': 1, 'DoctorName': 'Dr. STU', 'DoctorSpeciality': 'ENT' },
    //       {'DoctorId': 2, 'DoctorName': 'Dr. VWX', 'DoctorSpeciality': 'Paediatric' }
    //     ],  SlotDurationInMinutes: 30 },
    // { 'HospitalId': 1, 'HospitalName': 'JJ Hospital', 'DoctorsList': 
    //     [
    //       { 'DoctorId': 1, 'DoctorName': 'Dr. ABC', 'DoctorSpeciality': 'ENT' },
    //       {'DoctorId': 2, 'DoctorName': 'Dr. XYZ', 'DoctorSpeciality': 'Paediatric' }
    //     ],  SlotDurationInMinutes: 30 }
    // ];
    return this.http.get<any>(`${this.endpoint}/getHospitalList`);
  }

  saveHospital(hospital: Hospital): Observable<number> {
    console.log(hospital);
    console.log(JSON.stringify(hospital));
    return this.http.post<number>(`${this.endpoint}/addHospitalData`, JSON.stringify(hospital));
  }
}