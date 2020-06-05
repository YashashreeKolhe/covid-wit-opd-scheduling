import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor-service.service';
import { AppointmentService } from 'src/services/appointment-service.service';
import { GridOptions } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Hospital } from 'src/models/hospital';
import { HospitalService } from 'src/services/hospital-service.service';

@Component({
  selector: 'admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['admin-landing.component.css']
})
export class AdminLandingComponent {
  selectedDoctor: number;
  selectedSlot: string;
  selectedHospital: number;
  selectedDateFrom: Date;
  selectedDateTo: Date;
  vacantSeats: number;
  selectedEmergencyDoctor: number;
  selectedEmergencyDate: Date;
  modalRef: BsModalRef;
  chosenDoctorId: number;
  hospitalDetails: Hospital;
  doctor: Doctor;

  doctorsList: Doctor[];
  slots: string[] = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];

  alerts: string[] = [
    "The patient with appointment no. 1001 is a covid suspect",
    "The walk-in patient assigned a number 1004 is a covid suspect!",
  ];

  columnDefs;
  rowData;
  gridOptions: GridOptions;
  toaststatus = "Success";
  toastmessage = "Patients pushed to nest slots and notified!";

  constructor(private doctorService: DoctorService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private hospitalService: HospitalService,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.selectedHospital = params['hospitalId']
    );
    this.selectedHospital = 1;
    this.doctorsList = this.doctorService.getDoctorsList(this.selectedHospital);
    this.gridOptions = {
      getRowStyle: params => this.getRowBackround(params)
    };
    // .toPromise().then(
    //   result => this.doctorsList =  result
    // );
    this.columnDefs = this.getColumnDefs();
  }

  getRowBackround(params) {
    if (params.data.IsCovidSuspect === true) {
      return { 'background-color': 'orange' }
    };
  }

  getColumnDefs() {
    return [
      {
        headerName: 'Appointment No',
        field: 'AppointmentNumber',
        width: 100
      },
      {
        headerName: 'Patient Name',
        field: 'PatientName',
        width: 150
      },
      {
        headerName: 'Illness',
        field: 'PatientIllness', 
        width: 120,
      },
      {
        headerName: 'Age',
        field: 'PatientAge',
        width: 70 
      },
      {
        headerName: 'Gender',
        field: 'PatientGender',
        width: 70
      },
      {
        headerName: 'Date',
        field: 'Date',
        width: 100
      },
      {
        headerName: 'TimeSlot',
        field: 'Timeslot',
        width: 100 
      },
      {
        headerName: 'Covid Suspect',
        field: 'IsCovidSuspect', 
        cellRenderer: params => {
          if (params.data.IsCovidSuspect == true) {
            return 'Yes';
          } else {
            return 'No';
          }
        },
        width: 120
      },
    ];
  }

  search(){
    this.rowData = this.appointmentService.getAppointments(this.selectedDoctor, this.selectedSlot);
    this.vacantSeats = this.appointmentService.getVacantSeats(this.selectedDoctor, this.selectedSlot);
  }

  PushPatientsAndNotify() {
    console.log(this.selectedDateFrom);
    console.log(this.selectedDateTo);
    console.log(this.selectedEmergencyDate);
    this.toastr.success("The appointments are pushed to next slots and notifications are sent!", 'Success');
  }

  modifyParameters(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-xxl' }));
    this.hospitalDetails = this.hospitalService.getHospitalDetails(this.selectedHospital);
  }

  saveParameters() {
    this.toastr.success('Parameters saved successfully!', 'Success');
  }

  onChangeDoctor(newId: number) {
    this.doctor = this.hospitalDetails.DoctorsList.find(doc => doc.DoctorId == newId);
  }

  saveDoctorDetails() {
    //this.doctorService.saveDoctorDetails(this.doctor);
    this.toastr.show('Doctor OPD times updated successfully!', 'Success');
  }

  bookForWalkin() {
    this.router.navigateByUrl(`walk-in`, { queryParams: {
        'hospitalId': this.selectedHospital
      } 
    });
  }
}
