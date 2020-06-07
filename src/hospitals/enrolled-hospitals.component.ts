import { Component } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { HospitalService } from 'src/services/hospital-service.service';

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
  
  constructor(private hospitalService: HospitalService) {
  }

  ngOnInit() {
    this.gridOptions = {
      onRowClicked:params => this.onHospitalRowClicked(params),
      onGridReady:params => this.onGridReady(params)
    };
    this.columnDefs = this.getColumnDefsForHospitals();
    this.columnDefsDoctor = this.getColumnDefsForDoctors();
    this.rowData = this.hospitalService.getHospitals();
    this.rowDataDoctor = this.rowData[0].DoctorsList;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
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

  onHospitalRowClicked(params) {
    this.rowDataDoctor = this.rowData.find(hospital => hospital.HospitalId == params.data.HospitalId).DoctorsList;
  }
}
