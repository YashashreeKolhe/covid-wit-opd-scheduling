import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/services/data.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/services/appointment-service.service';
import { Appointment } from 'src/models/appointment';
import { Hospital } from 'src/models/hospital';
import { HospitalService } from 'src/services/hospital-service.service';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from 'src/services/doctor-service.service';
import { AdminService } from 'src/services/admin-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  userForm: FormGroup;
  hospitalsList: Hospital[] = [];
  doctors: Doctor[];
  timeSlots: string[];
  patientId: number;
  patientEmail: string;

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

  constructor(public data: DataService,private formBuilder: FormBuilder, public router: Router, 
    public route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private hospitalService: HospitalService,
    private appointmentService: AppointmentService,
    private adminService: AdminService) { 
    this.userForm = this.formBuilder.group({
      'firstName': [this.user.FirstName, [Validators.required]],
      'lastName': [this.user.LastName, [Validators.required]],
      'hospitals': [this.user.HospitalId, [Validators.required]],
      
      'mobileNumber': [this.user.MobileNumber, [Validators.required]],
      'emailId': [this.user.EmailId, [Validators.required]],
      'doctor': [this.user.HospitalId, [Validators.required]],
      'appointmentDate': [this.user.Date, [Validators.required]],
      'timeSlot': [this.user.Timeslot, [Validators.required]],
      'notes': [this.user.PatientIllness, [Validators.maxLength(45)]],
    });
  }

  async ngOnInit(){
    this.route.params.subscribe(params =>
      this.patientEmail = params['patientEmail']
    );
    this.patientId = await this.adminService.getPatientId(this.patientEmail).toPromise();
    this.user.PatientId = this.patientId;
    this.hospitalsList = await this.hospitalService.getHospitals().toPromise();
  }
  
  async onClickSubmit(data){
    console.log(data);
    this.toastr.success('Appointment booked successfully!', 'Success');
    //this.data.submitBooking(data).subscribe()
    var submitData = {
      PatientId: this.patientId,
      FirstName: data.firstName,
      LastName: data.lastName,
      MobileNumber: data.mobileNumber,
      EmailId: data.emailId,
      HospitalId: data.hospitals,
      DoctorId: data.doctor,
      Date: data.appointmentDate,
      Timeslot: data.timeSlot,
      PatientIllness: data.notes,
      PatientName: data.firstName + ' ' + data.lastName,
      DateString: data.appointmentDate.toString()
    } as Appointment;
    console.log(submitData);
    var result = await this.appointmentService.submitAppointment(submitData).toPromise();
  }

  onHospitalChanged(newHospitalId) {
    this.doctors = this.hospitalsList[newHospitalId].DoctorsList;
  }

  async onDateChanged(date) {
    var result = await this.appointmentService.getVacantSlots(this.userForm.value.doctor, this.userForm.value.appointmentDate.toString()).toPromise();
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
