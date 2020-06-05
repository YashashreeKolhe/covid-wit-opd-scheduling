import { Doctor } from './doctor';

export interface Hospital {
  HospitalId?: number;
  DoctorsList: Doctor[];
  SlotDurationInMinutes?: number;
}