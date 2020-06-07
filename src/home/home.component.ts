import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor( public data: DataService , public router: Router) {}

  ngOnInit() {
  }
}
