export interface Appointment {
  AppointmentNumber?: number;
  PatientId?: number;
  PatientName?: string;
  HospitalId?: number;
  HospitalName?: string;
  DoctorId?: number;
  DoctorName?: string;
  PatientAge?: number;
  PatientGender?: string;
  PatientIllness?: string;
  IsCovidSuspect?: boolean;
  Timeslot?: string;
  Date?: Date;
}

export interface Vacancy {
  TimeSlot?: string;
  Vacancies?: number;
}

