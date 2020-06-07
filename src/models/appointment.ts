export interface Appointment {
  AppointmentNumber?: number;
  FirstName?: string;
  LastName?: string;
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
  DateString?: string;
  MobileNumber?: string;
  EmailId?: string;
  IsPushed?: boolean;
  IsCancelled?: boolean;
  Password?: string;
}

export interface Vacancy {
  TimeSlot?: string;
  Vacancies?: number;
}

