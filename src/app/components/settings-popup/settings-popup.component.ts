import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent {
  @Input() showPopup: boolean = false;

  closePopup() {
    this.showPopup = false;
  }
}
