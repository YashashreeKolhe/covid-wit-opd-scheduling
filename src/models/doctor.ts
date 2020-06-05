import { Time } from '@angular/common';

export interface Doctor {
    DoctorId?: number;
    DoctorName?: string;
    DoctorSpeciality?: string;
    AverageTimeInMinutes?: number;
    OPDStartTime?: Date;
    OPDEndTime?: Date;
}