import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
	menus: any;
	isCollapsed = false;
	selectedMenu: string;

	constructor(
		private router: Router
	) {}

	ngOnInit() {
		this.menus = [
			{
				'Title': 'Home',
				'Location': '/',
				'IsActive': true
			}, 
			{
				'Title': 'Enrolled Hospitals',
				'Location': '/enrolled-hospitals',
				'IsActive': false
			},
			{
				'Title': 'Contact Us',
				'Location': '/contact-us',
				'IsActive': false
			},
		];
		this.selectedMenu = this.menus[0].Title;
	}

	redirectToHome() {
		this.router.navigateByUrl('');
	}

	navigate(menuTitle: string) {
		let menu = this.menus.find(menu => menu.Title === menuTitle);
		menu.IsActive = true;
		this.router.navigateByUrl(menu.Location);
	}
}
