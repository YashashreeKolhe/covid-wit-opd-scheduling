import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor-service.service';
import { AppointmentService } from 'src/services/appointment-service.service';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Hospital } from 'src/models/hospital';
import { HospitalService } from 'src/services/hospital-service.service';
import { AdminService } from 'src/services/admin-service.service';
import { Admin } from 'src/models/admin';
import { DatePipe } from '@angular/common';
import { Emergency } from 'src/models/emergency';

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
  hospitalDetailsEnroll: Hospital;
  doctorEnroll: Doctor;
  isEnrolled: boolean;

  gridOptionsDoctor: GridOptions;
  gridApiDoctor: GridApi;
  rowDataDoctor: Doctor[];
  columnDefsDoctor;

  doctorsList: Doctor[];
  slots: string[];

  alerts: string[] = [];
  columnDefs;
  rowData;
  gridOptions: GridOptions;
  toaststatus = "Success";
  toastmessage = "Patients pushed to nest slots and notified!";
  admin: Admin;
  adminUserName: string;

  constructor(private doctorService: DoctorService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private hospitalService: HospitalService,
    private router: Router,
    private adminService: AdminService,
    private datePipe: DatePipe) {}

  async ngOnInit() {
    this.alerts = await this.generateAlerts();
    this.route.params.subscribe(params =>
      this.adminUserName = params['username']
    );
    this.adminUserName = 'ADMIN123';
    this.admin = await this.adminService.getAdminDetails(this.adminUserName).toPromise();
    this.selectedHospital = this.admin.HospitalId;
    if (this.selectedHospital == 0) {
      this.isEnrolled = false;
    }
    this.selectedHospital = 1;
    this.doctorsList = await this.doctorService.getDoctorsList(this.selectedHospital).toPromise();
    this.gridOptions = {
      getRowStyle: params => this.getRowBackround(params)
    };
    // .toPromise().then(
    //   result => this.doctorsList =  result
    // );
    this.columnDefs = this.getColumnDefs();
  }

  onDoctorChanged(newDocId: number) {
    var doctor = this.doctorsList.find(doc => doc.DoctorId === parseInt(newDocId.toString(), 10));
    this.slots = this.appointmentService.getAllTimeSlots(doctor.OPDStartTimeString, doctor.OPDEndTimeString, doctor.SlotDuration);
  }

  async generateAlerts() {
    var appointments = await this.appointmentService.getCovidSuspectsForToday(this.selectedHospital, new Date().toString()).toPromise();
    var emergencies = await this.appointmentService.getEmergenciesForToday(new Date().toString()).toPromise();
    var list = [];
    list.push(`There are ${appointments.length} covid suspects arriving today!`);
    emergencies.forEach(emergency => {
      list.push(`${emergency.DoctorName} has an emergency from '${emergency.UnavailableFrom}' to '${emergency.UnavailableTo}`);
    })
    appointments.forEach(element => {
      list.push(`No. '${element.AppointmentNumber}' is a covid suspect - Arriving at '${element.Timeslot}'`);
    });
    return list;
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

  async search(){
    this.rowData = await this.appointmentService.getAppointments(this.selectedDoctor, this.selectedSlot).toPromise();
    var result = await this.appointmentService.getVacantSlots(this.selectedDoctor, new Date().toString()).toPromise();
    this.vacantSeats = result.find(slot=> slot.TimeSlot === this.selectedSlot)?.Vacancies;
  }

  async PushPatientsAndNotify() {
    var unavailableFrom = this.datePipe.transform(this.selectedDateFrom, 'h:mm:ss a')?.toString();
    var unavailableTo = this.datePipe.transform(this.selectedDateTo, 'h:mm:ss a')?.toString();
    var emergency = {
      EmergencyId: -1,
      UnavailableFrom: unavailableFrom,
      UnavailableTo: unavailableTo,
      DoctorId: this.selectedEmergencyDoctor,
      Date: this.selectedEmergencyDate
    } as Emergency;
    await this.doctorService.pushPatientsAndNotify(emergency).toPromise();
    this.toastr.success("The appointments are pushed to next slots and notifications are sent!", 'Success');
  }

  async modifyParameters(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.hospitalDetails = {
      HospitalId: this.selectedHospital,
      HospitalName: '',
      DoctorsList: []
    } as Hospital;
    this.hospitalDetails.DoctorsList = await this.hospitalService.getDoctorList(this.selectedHospital).toPromise();
  }

  onChangeDoctor(newId: number) {
    this.doctor = this.hospitalDetails.DoctorsList.find(doc => doc.DoctorId == newId);
  }

  saveDoctorDetails() {
    this.doctorService.saveDoctorDetails(this.doctor);
    this.toastr.show('Doctor OPD times updated successfully!', 'Success');
  }

  addDoctor() {
    this.doctorEnroll.OPDEndTimeString = this.datePipe.transform(this.doctorEnroll.OPDEndTime, 'h:mm:ss a').toString();
    this.doctorEnroll.OPDStartTimeString = this.datePipe.transform(this.doctorEnroll.OPDStartTime, 'h:mm:ss a').toString();
    this.doctorEnroll.Capacity = (Number) (this.doctorEnroll.SlotDuration/this.doctorEnroll.AverageTimeInMinutes);
    this.hospitalDetailsEnroll.DoctorsList.push(this.doctorEnroll);
    this.gridApiDoctor.updateRowData({ add: [this.doctorEnroll]});
    this.doctorEnroll = this.initializeDoctor();
  }

  async enroll() {
    // var hospitalId = await this.hospitalService.saveHospitalDetail(this.hospitalDetailsEnroll).toPromise();
    // this.hospitalDetailsEnroll.HospitalId = hospitalId;
    // this.hospitalDetailsEnroll.DoctorsList.forEach(async hosp => {
    //   await this.doctorService.saveDoctorDetails(hosp).toPromise();
    // });
    await this.hospitalService.saveHospital(this.hospitalDetailsEnroll).toPromise();
    console.log(this.hospitalDetailsEnroll);
    this.toastr.success('Hospital enrolled successfully!', 'Success');
  }

  initializeHospital(): Hospital {
    return {
      HospitalId: -1,
      HospitalName: '',
      DoctorsList: []
    };
  }

  initializeDoctor(): Doctor {
    return {
      DoctorId: -1,
      DoctorName: '',
      DoctorSpeciality: '',
      OPDEndTime: new Date(),
      OPDStartTime: new Date(),
      AverageTimeInMinutes: 10,
      SlotDuration: 30
    }
  }

  enrollHospital(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
    this.hospitalDetailsEnroll = this.initializeHospital();
    this.doctorEnroll = this.initializeDoctor();
    this.gridOptionsDoctor = {
      onGridReady:params => this.onGridReady(params)
    }
    this.rowDataDoctor = this.hospitalDetailsEnroll.DoctorsList;
    this.columnDefsDoctor = this.getColumnDefsDoctor();
  }

  onGridReady(params) {
    this.gridApiDoctor = params.api;
  }

  bookForWalkin() {
    this.router.navigateByUrl(`walk-in`, { queryParams: {
        'hospitalId': this.selectedHospital
      } 
    });
  }

  getColumnDefsDoctor() {
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
        width: 200,
      },
      {
        headerName: 'OPDEndTime',
        field: 'OPDEndTimeString',
        width: 200,
      },
      {
        headerName: 'Average time',
        field: 'AverageTimeInMinutes',
        width: 100
      },
      {
        headerName: 'Slot Duration',
        field: 'SlotDuration',
        width: 120
      }
    ];
  }
}
