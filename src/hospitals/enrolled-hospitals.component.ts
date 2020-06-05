import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HospitalService } from 'src/services/hospital-service.service';

@Component({
  selector: 'enrolled-hospitals',
  templateUrl: './enrolled-hospitals.component.html',
})
export class EnrolledHospitalsComponent {
  columnDefs;
  rowData;
  gridOptions: GridOptions;
  columnDefsDoctor;
  rowDataDoctor;
  gridOptionsDoctor: GridOptions;
  
  constructor(private hospitalService: HospitalService) {
  }

  ngOnInit() {
    this.rowData = this.hospitalService.getHospitals();
  }

  onHospitalRowClicked(params) {

  }
}
