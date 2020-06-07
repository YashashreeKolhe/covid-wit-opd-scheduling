import { Time } from '@angular/common';

export interface Doctor {
    DoctorId?: number;
    DoctorName?: string;
    DoctorSpeciality?: string;
    AverageTimeInMinutes?: number;
    OPDStartTime?: Date;
    OPDStartTimeString?: string;
    OPDEndTime?: Date;
    OPDEndTimeString?: string;
    SlotDuration?: number;
    AvailableFrom?: string;
    AvailableTo?: string;
    Capacity?: number;
}