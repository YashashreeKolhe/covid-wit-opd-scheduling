import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/models/appointment';

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) { }

  // getDoctorsList(hospitalId: number): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(`/doctors/${hospitalId}`);
  // }

  getAppointments(doctorId: number, slot: string): Appointment[] {
    return [
      { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' },
      { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': true, 'Timeslot': '11:00 AM' },
      { 'AppointmentNumber': 1001, 'PatientName': 'Yashashree Kolhe', 'PatientAge': 22, 'PatientGender': 'F', 'IsCovidSuspect': false, 'Timeslot': '11:00 AM' }
    ];
  }

  getVacantSeats(doctorId: number, slot: string): number {
    return 2;
  }

  getVacancies(doctorId: number, date: Date) {
    return [
      { 'TimeSlot': '11:00 AM', 'Vacancies': 2 },
      { 'TimeSlot': '11:30 AM', 'Vacancies': 3 },
      { 'TimeSlot': '12:00 PM', 'Vacancies': 0 },
    ]
  }
}