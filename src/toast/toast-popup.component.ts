import { Component, Input } from '@angular/core';

@Component({
  selector: 'toast-popup',
  templateUrl: './toast-popup.component.html',
})
export class ToastPopupComponent {
  @Input() toaststatus: string;
  @Input() toastmessage: string;
}
