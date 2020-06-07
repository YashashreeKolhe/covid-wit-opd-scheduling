import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from 'src/models/admin';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  endpoint: string = 'https://opd-scheduling-system.eu-gb.mybluemix.net';
  //endpoint: string = 'http://localhost:8080';

  getAdminDetails(adminUserName: string): Observable<Admin> {
    //return { 'AdminId': 1, 'AdminUserName': 'ADMIN123', 'HospitalId': 0};
    return this.http.get<Admin>(`${this.endpoint}/getAdminDetails`, {
        params: {
          emailId: adminUserName,
        }
      });
  }

  getPatientId(patientEmail: string): Observable<number> {
    return this.http.get<number>(`${this.endpoint}/getPatientIdFromEmail`, {
      params: {
        email: patientEmail,
      }
    });
  }

  setHospitalId(hospitalId: number, adminId: number): Observable<string> {
    return this.http.get<string>(`${this.endpoint}/setHospitalId`, {
      params: {
        hospitalId: hospitalId.toString(),
        adminId: adminId.toString()
      }
    });
  }
}