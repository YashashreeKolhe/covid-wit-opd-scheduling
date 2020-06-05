import { Component } from '@angular/core';
import { AppointmentService } from 'src/services/appointment-service.service';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/services/doctor-service.service';
import { Vacancy } from 'src/models/appointment';

@Component({
  selector: 'walkin-booking',
  templateUrl: './walkin-booking.component.html',
  styleUrls: ['admin-landing.component.css']
})
export class WalkinBookingComponent {
  selectedHospital: number;
  selectedDoctor: number;
  doctorsList: Doctor[];

  columnDefs;
  rowData: Vacancy[];
  gridOptions: GridOptions;

  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private doctorService: DoctorService) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.selectedHospital = params['hospitalId']
    );
    console.log(this.selectedHospital);
    this.doctorsList = this.doctorService.getDoctorsList(this.selectedHospital);
    this.gridOptions = {
      getRowStyle: params => this.getRowBackround(params)
    };
    this.columnDefs = this.getColumnDefs();
  }

  getRowBackround(params) {
    if (params.data.Vacancies > 0) {
      return { 'background-color': '#f8ff7a' }
    };
  }

  onChangeDoctor(newId: number) {
    this.rowData = this.appointmentService.getVacancies(newId, new Date());
  }

  getColumnDefs() {
    return [
      {
        headerName: 'Time Slot',
        field: 'TimeSlot',
        width: 160
      },
      {
        headerName: 'Vacancies',
        field: 'Vacancies',
        width: 150
      },
    ];
  }
}