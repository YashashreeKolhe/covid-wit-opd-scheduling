import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./app.component.css']
})
export class HomePageComponent {
  patientloginForm: FormGroup;
  patientRegistrationForm: FormGroup;
  adminLoginForm: FormGroup;
  
  constructor(
    public data: DataService, private formBuilder: FormBuilder, private router: Router,
    private toastr: ToastrService
 ) {
   this.patientloginForm = this.formBuilder.group({
     'patientloginEmailId': [undefined, [Validators.required]],
     'patientloginPassword': [undefined, [Validators.required]],
     //'hospitals': [this.user.hospitals, [Validators.required]],
   })
   this.patientRegistrationForm = this.formBuilder.group({
     'patientregEmailId': [undefined, [Validators.required]],
     'patientregPassword': [undefined, [Validators.required]],
     
   })
   this.adminLoginForm = this.formBuilder.group({
     'adminloginEmailId': [undefined, [Validators.required]],
     'adminloginPassword': [undefined, [Validators.required]],
     //'hospitals': [this.user.hospitals, [Validators.required]],
   })
 }

 ngOnInit() {
    this.data.show();
 }
 
 async onClickSubmitPatientLoginDetails(data){
   var result = await this.data.checkPatientLogin(data.patientloginEmailId, data.patientloginPassword).toPromise();
   if(result == true){
    this.router.navigateByUrl(`/book?patientEmail=${data.patientloginEmailId}`);
   }
   else{
    this.toastr.error('Invalid credentials!', 'Error');
   }
 }

 async onClickSubmitAdminLoginDetails(data){
   //service to be written
   var result = await this.data.checkAdminLogin(data.adminloginEmailId, data.adminloginPassword).toPromise();
   if(result == true){
     this.router.navigateByUrl(`/admin?adminEmail=${data.adminloginEmailId}`);
   }
   else{
     this.toastr.error('Invalid credentials!', 'Error');
   }
 }

 async onClickSubmitRegistrationDetails(data){
   var result = await this.data.submitRegistrationDetails(data.patientregEmailId, data.patientloginPassword).toPromise();
    if (result == "Data added successfully") {
      this.toastr.success('Registration successful!', 'Success');
    } else {
      this.toastr.error('Email already registered!', 'Error');
    }
  }
}
