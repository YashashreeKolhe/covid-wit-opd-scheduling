import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, Vacancy } from 'src/models/appointment';
import { Emergency } from 'src/models/emergency';

@Injectable()
export class AppointmentService {
  endpoint: string = 'https://localhost:8080';
  //'https://opd-scheduling-system.eu-gb.mybluemix.net';

  constructor(private http: HttpClient) { }

  getAppointments(doctorId: number, slot: string): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': true, 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' }
    // ];
    return this.http.get<Appointment[]>(`${this.endpoint}/getPatientList`, {
      params: {
        doctorId: doctorId.toString(),
        timeSlot: slot
      }
    });
  }

  getCovidSuspectsForToday(hospitalId: number, date: string): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': true, 'Timeslot': '11:00 AM' },
    // ];
    return this.http.get<Appointment[]>(`/url`, {
      params: {
        hospitalId: hospitalId.toString(),
        date: date.toString()
      }
    });
  }

  getEmergenciesForToday(date: string ): Observable<Emergency[]> {
    // return [

    // ];
    return this.http.get<Emergency[]>(`${this.endpoint}/`, {
      params: {
        date: date.toString()
      }
    });
  }

  getPushedAppointmentsForPatient(patientId: number, date: string) {
    return [
      { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
      { 'AppointmentNumber': 1002, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
    ];
    //return this.http.get<Appointment[]>(`${this.endpoint}/`, {
    //   params: {
    //     patientId: patientId
    //     date: date
    //   }
    // });
  }

  getAppointmentsForAPatient(patientId: number): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1002, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1003, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' }
    // ];
    return this.http.get<Appointment[]>(`${this.endpoint}/getAppointments`, {
      params: {
        'patientId': patientId.toString()
      }
    });
  }

  getDeletedAppointments(patientId: number) {
    return [];
  }

  submitAppointment(data): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/setPatientData`, data);
  }

  cancelAppointment(appointmentId: number){
    return this.http.get<any>(`${this.endpoint}/`, {
      params: {
        appointmentId: appointmentId.toString()
      }
    });
  }

  getAllTimeSlots(startTime: string, endTime: string, slot: number) {
    return ["11:00 AM", '12:00 PM', '1:00 PM'];
    // return this.http.get<string[]>(`${this.endpoint}/`, {
    //   params: {
    //     startTime: startTime,
    //     endTime: endTime,
    //     slot: slot
    //   }
    // });
  }

  getNextAvailableSlot(doctorId: number) {
    return this.http.get<string>(`${this.endpoint}/getNextAvailableSlot`, {
      params: {
        doctorId: doctorId.toString()
      }
    });
  }

  getVacantSlots(doctorId: number, date: string): Observable<Vacancy[]> {
    // return [
    //   {
    //     'TimeSlot':'11:00 AM', 'Vacancies': 1
    //   }, 
    //   {
    //     'TimeSlot':'12:00 AM', 'Vacancies': 2
    //   }];
    return this.http.get<Vacancy[]>(`${this.endpoint}/getVacantSlots`, {
      params: {
        doctorId: doctorId.toString(),
        date: date
      }
    });
  }
}