import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/services/appointment-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  patientId: null;
  appointmentId: null;
  public bookingslist: any;
  bookingListColumns: any;
  //boolean diable: true;

  alerts: string[] = [];

  constructor(public data: DataService, public spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService) { }

  async ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params =>
      this.patientId = params['PatientId']
    );
    this.getBookingsList(this.patientId);
    this.alerts = await this.generateAlerts();
    this.spinner.hide();
  }

  async generateAlerts() {
    var emergencies = await this.appointmentService.getEmergenciesForToday(new Date().toString()).toPromise();
    var pushed = await this.appointmentService.getPushedAppointmentsForPatient(this.patientId, new Date().toString());
    var deleted = this.appointmentService.getDeletedAppointments(this.patientId);
    var list = [];
    pushed.forEach(element => {
      list.push(` Your appointment No. '${element.AppointmentNumber}' is pushed to '${element.Timeslot}'`);
    });
    emergencies.forEach(emergency => {
      list.push(`${emergency.DoctorName} has an emergency from '${emergency.UnavailableFrom}' to '${emergency.UnavailableTo}`);
    });
    return list;
  }

  async getBookingsList(patientId){
    /*this.data.getBookingsList().subscribe(
      (result: Array<any>) => {
          this.bookingslist = result;
          
      },(error:any) =>{
        console.log('error', error)
      }
      
    )*/
    this.bookingslist = await this.appointmentService.getAppointmentsForAPatient(this.patientId).toString();
  }

  deleteRow(appointmentId){
    this.spinner.show();
    console.log(appointmentId+"index is");
    this.appointmentService.cancelAppointment(appointmentId);
    //subscribe to service for cancelling the appointment
    /*this.data.updateBookingList().subscribe(
      (result: Array<any>) => {
          this.bookingslist = result;
          
      },(error:any) =>{
        console.log('error', error)
      }
      
    )*/
    this.bookingslist = this.appointmentService.getAppointmentsForAPatient(this.patientId);
    this.spinner.hide();
  }
}
