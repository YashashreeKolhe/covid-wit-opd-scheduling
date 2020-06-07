import { Component } from '@angular/core';
import { AppointmentService } from 'src/services/appointment-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/services/doctor-service.service';
import { Vacancy, Appointment } from 'src/models/appointment';
import { Hospital } from 'src/models/hospital';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import { HospitalService } from 'src/services/hospital-service.service';
import { AdminService } from 'src/services/admin-service.service';
import { DatePipe } from '@angular/common';

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
  availableSlot: string = '';

  userForm: FormGroup;
  hospitalsList: Hospital[] = [];
  doctors: Doctor[];
  timeSlots: string[];
  isEnabled: boolean = false;
  
  user: Appointment = {
    PatientId: undefined,
    FirstName: undefined,
    LastName: undefined,
    MobileNumber: undefined,
    EmailId: undefined,
    HospitalId: undefined,
    DoctorId: undefined,
    Date: undefined,
    Timeslot: undefined,
    PatientIllness: undefined,
    DateString: undefined,
    PatientName: undefined,
    PatientAge: undefined,
    PatientGender: undefined
  };

  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder, 
    public router: Router,
    private hospitalService: HospitalService,
    private adminService: AdminService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {
      this.userForm = this.formBuilder.group({
        'firstName': [this.user.FirstName, [Validators.required]],
        'lastName': [this.user.LastName, [Validators.required]],
        'mobileNumber': [this.user.MobileNumber, [Validators.required]],
        'emailId': [this.user.EmailId, [Validators.required]],
        'doctor': [this.user.HospitalId, [Validators.required]],
        'appointmentDate': [this.user.Date, [Validators.required]],
        'timeSlot': [this.user.Timeslot, [Validators.required]],
        'notes': [this.user.PatientIllness, [Validators.maxLength(45)]],
      });
    }

  async ngOnInit() {
    this.route.queryParams.subscribe(params =>
      this.selectedHospital = params['hospitalId']
    );
    console.log(this.selectedHospital);
    this.doctorsList = await this.doctorService.getDoctorsList(this.selectedHospital).toPromise();
    this.doctors = JSON.parse(JSON.stringify(this.doctorsList));
    this.gridOptions = {
      getRowStyle: params => this.getRowBackround(params)
    };
    this.columnDefs = this.getColumnDefs();

    this.user.PatientId = -1;
  }

  getRowBackround(params) {
    if (params.data.Vacancies > 0) {
      return { 'background-color': '#f8ff7a' }
    };
  }

  async onChangeDoctor(newId: number) {
    this.rowData = await this.appointmentService.getVacantSlots(newId, this.datePipe.transform(new Date(), 'dd/MM/yyyy')).toPromise();
    this.isEnabled = this.rowData.map(entry => entry.Vacancies).reduce((acc, curr) => acc + curr) == 0;
  }

  async getNextAvailableSlot() {
    this.availableSlot = await this.appointmentService.getNextAvailableSlot(this.selectedDoctor).toPromise();
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

  async onClickSubmit(data){
    console.log(data);
    this.toastr.success('Appointment booked successfully!', 'Success');
    //this.data.submitBooking(data).subscribe()
    var submitData = {
      PatientId: -2,
      FirstName: data.firstName,
      LastName: data.lastName,
      MobileNumber: data.mobileNumber,
      EmailId: data.emailId,
      HospitalId: this.selectedHospital,
      DoctorId: data.doctor,
      Date: data.appointmentDate,
      Timeslot: data.timeSlot.toUpperCase(),
      PatientIllness: data.notes,
      PatientAge: -1,
      PatientGender: '',
      PatientName: data.firstName + ' ' + data.lastName,
      DateString: this.datePipe.transform(data.appointmentDate, 'dd/MM/yyyy'),
      Password: '123'
    } as Appointment;
    console.log(submitData);
    var result = await this.appointmentService.submitAppointment(submitData).toPromise();
  }

  onHospitalChanged(newHospitalId) {
    this.doctors = this.hospitalsList[newHospitalId].DoctorsList;
  }

  async onDateChanged(date) {
    var result = await this.appointmentService.getVacantSlots(this.userForm.value.doctor, this.datePipe.transform(this.userForm.value.appointmentDate, 'dd/MM/yyyy')).toPromise();
    this.timeSlots = result.map(entry => entry.TimeSlot);
  }
    
  goToBookings() {
    this.router.navigateByUrl('/bookings', {
      queryParams: {
        'PatientId': 1
      }
    });
  }
}