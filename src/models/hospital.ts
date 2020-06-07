import { Doctor } from './doctor';

export interface Hospital {
  HospitalId?: number;
  HospitalName?: string;
  DoctorsList: Doctor[];
  SlotDurationInMinutes?: number;
}