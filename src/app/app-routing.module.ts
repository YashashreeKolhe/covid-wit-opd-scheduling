import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../login/login.module';
import { HomeComponent } from 'src/home/home.component';
import { LoginComponent } from 'src/login/login.component';
import { AdminLandingComponent } from 'src/admin/admin-landing.component';
import { AdminModule } from '../admin/admin.module';
import { WalkinBookingComponent } from 'src/admin/walkin-booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminLandingComponent, pathMatch: 'full' },
  { path: 'walk-in', component: WalkinBookingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
    LoginModule,
    AdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
