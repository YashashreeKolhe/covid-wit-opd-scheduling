import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, Vacancy } from 'src/models/appointment';
import { Emergency } from 'src/models/emergency';

@Injectable()
export class AppointmentService {
  endpoint: string = 'https://opd-scheduling-system.eu-gb.mybluemix.net';
  //'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAppointments(doctorId: number, slot: string, date: string): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': true, 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' }
    // ];
    return this.http.get<Appointment[]>(`${this.endpoint}/getPatientList`, {
      params: {
        doctorId: doctorId.toString(),
        timeslot: slot.toUpperCase(),
        date: date
      }
    });
  }

  getCovidSuspectsForToday(hospitalId: number, date: string): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': true, 'Timeslot': '11:00 AM' },
    // ];
    return this.http.get<Appointment[]>(`${this.endpoint}/getCovidSuspectsList`, {
      params: {
        hospitalId: hospitalId.toString(),
        date: date.toString()
      }
    });
  }

  getEmergenciesForToday(hospitalId: number ): Observable<Emergency[]> {
    // return [

    // ];
    return this.http.get<Emergency[]>(`${this.endpoint}/getEmergencyList`, {
      params: {
        hospitalId: hospitalId.toString()
      }
    });
  }

  getPushedAppointmentsForPatient(patientId: number): Observable<Appointment[]> {
    // return [
    //   { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
    //   { 'AppointmentNumber': 1002, 'PatientName': 'Yashashree Kolhe', 'HospitalName': 'KEM', 'DoctorName': 'Dr. Cooper', 'Timeslot': '11:00 AM' },
    // ];
    return this.http.get<Appointment[]>(`${this.endpoint}/getPushedAppointmentList`, {
      params: {
        patientId: patientId.toString()
      }
    });
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

  getDeletedAppointments(patientId: number): Observable<Appointment[]> {
    //return [];
    return this.http.get<Appointment[]>(`${this.endpoint}/getCancelledAppointmentList`, {
      params: {
        'patientId': patientId.toString()
      }
    });
  }

  submitAppointment(data): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/setPatientData`, data);
  }

  cancelAppointment(appointmentId: number){
    return this.http.get<any>(`${this.endpoint}/deleteAppointment`, {
      params: {
        appointmentId: appointmentId.toString()
      }
    });
  }

  getAllTimeSlots(startTime: string, endTime: string, slot: number): Observable<string[]> {
    //return ["11:00 AM", '12:00 PM', '1:00 PM'];
    return this.http.get<string[]>(`${this.endpoint}/getAllTimeSlots`, {
      params: {
        start: startTime,
        end: endTime,
        slotTimeInMinStr: slot.toString()
      }
    });
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