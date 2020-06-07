import { Component } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { HospitalService } from 'src/services/hospital-service.service';
import { DoctorService } from 'src/services/doctor-service.service';

@Component({
  selector: 'enrolled-hospitals',
  templateUrl: './enrolled-hospitals.component.html',
  styleUrls: ['enrolled-hospitals.component.css']
})
export class EnrolledHospitalsComponent {
  columnDefs;
  rowData;
  gridOptions: GridOptions;
  columnDefsDoctor;
  rowDataDoctor;
  gridOptionsDoctor: GridOptions;
  gridApi: GridApi;
  
  constructor(private hospitalService: HospitalService,
    private doctorService: DoctorService) {
  }

  async ngOnInit() {
    this.gridOptions = {
      onRowClicked:params => this.onHospitalRowClicked(params),
      onGridReady:params => this.onGridReady(params)
    };
    this.columnDefs = this.getColumnDefsForHospitals();
    this.columnDefsDoctor = this.getColumnDefsForDoctors();
    var result = await this.hospitalService.getHospitals().toPromise();
    this.rowData = result.HospitalList;
    this.rowDataDoctor = await this.doctorService.getDoctorsList(this.rowData[0].HospitalId).toPromise();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  getColumnDefsForHospitals() {
    return [
      {
        headerName: 'Hospital Id',
        field: 'HospitalId',
        width: 100
      },
      {
        headerName: 'Hospital Name',
        field: 'HospitalName',
        width: 200
      }
    ];
  }

  getColumnDefsForDoctors() {
    return [
      {
        headerName: 'Doctor Name',
        field: 'DoctorName',
        width: 200
      },
      {
        headerName: 'Speciality',
        field: 'DoctorSpeciality',
        width: 200
      },
      {
        headerName: 'OPDStartTime',
        field: 'OPDStartTimeString',
        width: 200
      },
      {
        headerName: 'OPDEndTime',
        field: 'OPDEndTimeString',
        width: 200
      }
    ];
  }

  async onHospitalRowClicked(params) {
    this.rowDataDoctor = await this.doctorService.getDoctorsList(params.data.HospitalId).toPromise();
  }
}
