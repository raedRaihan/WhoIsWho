import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service'; // Adjust path as needed

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  genre: string = '';
  isInverted: boolean = false;
  gameMode: string = '';
  // hasYearPreference: boolean = false;
  // minYear?: Date;
  // maxYear?: Date;
  genres: string[] = [];
  rounds: number = 0;
  showPopup: boolean = false;
  constructor(private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    const currentSettings = this.settingsService.getSettings();
    this.genre = currentSettings.genre;
    this.isInverted = currentSettings.isInverted;
    this.gameMode = currentSettings.gameMode;
    this.rounds = currentSettings.rounds;
    // this.hasYearPreference = currentSettings.hasYearPreference;
    // this.minYear = currentSettings.minYear;
    // this.maxYear = currentSettings.maxYear;
    this.genres = [
      'rock',
      'all',
      'rap',
      'pop',
      'country',
      'hip-hop',
      'jazz',
      'alternative',
      'j-pop',
      'k-pop',
      'emo',
      'eurobeat',
    ];
    console.log(this)
  }

  saveSettings(): void {
    const updatedSettings = {
      genre: this.genre,
      isInverted: this.isInverted,
      gameMode: this.gameMode,
      rounds: this.rounds,
      // hasYearPreference: this.hasYearPreference,
      // minYear: this.hasYearPreference ? this.minYear : null,
      // maxYear: this.hasYearPreference ? this.maxYear : null,
    };

    this.showPopup = true;  // Show the popup
    this.settingsService.updateSettings(updatedSettings);  // Save the settings
    console.log('Settings saved:', updatedSettings);

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  resetSettings(): void {
    this.settingsService.resetSettings();
    this.ngOnInit();
  }
  closePopup(): void {
    this.showPopup = false;
  }
}
