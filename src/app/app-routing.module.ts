import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../login/login.module';
import { HomeComponent } from 'src/home/home.component';
import { LoginComponent } from 'src/login/login.component';
import { AdminLandingComponent } from 'src/admin/admin-landing.component';
import { AdminModule } from '../admin/admin.module';
import { WalkinBookingComponent } from 'src/admin/walkin-booking.component';
import { EnrolledHospitalsComponent } from 'src/hospitals/enrolled-hospitals.component';
import { HospitalsModule } from 'src/hospitals/hospitals.module';
import { BookComponent } from 'src/book/book.component';
import { BookModule } from 'src/book/book.module';
import { BookingsComponent } from 'src/bookings/bookings.component';
import { BookingsModule } from 'src/bookings/bookings.module';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminLandingComponent, pathMatch: 'full' },
  { path: 'walk-in', component: WalkinBookingComponent },
  { path: 'enrolled-hospitals', component: EnrolledHospitalsComponent },
  { path: 'bookings', component: BookingsComponent, pathMatch: 'full'},
  { path: 'book', component: BookComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
    LoginModule,
    BookingsModule,
    BookModule,
    AdminModule,
    HospitalsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
