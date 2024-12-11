import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private localStorageKey = 'appSettings';

  private defaultSettings: any = {
    genre: 'all',
    isInverted: false,
    gameMode: 'NTS',
    hasYearPreference: false,
    minYear: null,
    maxYear: null,
  };

  constructor() {
    this.loadSettingsFromLocalStorage();
  }

  getSettings(): any {
    return this.loadSettingsFromLocalStorage();
  }

  updateSettings(updatedSettings: any): void {
    const settings = { ...this.defaultSettings, ...updatedSettings };
    this.saveSettingsToLocalStorage(settings);
    this.applyTheme(settings.isInverted); 
    console.log('settings updated:', settings);
  }

  resetSettings(): void {
    this.saveSettingsToLocalStorage(this.defaultSettings);
    this.applyTheme(this.defaultSettings.isInverted); 
    console.log('settings reset to defaults');
  }

  private loadSettingsFromLocalStorage(): any {
    const settings = localStorage.getItem(this.localStorageKey);
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      this.applyTheme(parsedSettings.isInverted); // Apply theme when settings are loaded
      return parsedSettings;
    } else {
      this.saveSettingsToLocalStorage(this.defaultSettings);
      this.applyTheme(this.defaultSettings.isInverted);
      return this.defaultSettings;
    }
  }

  private saveSettingsToLocalStorage(settings: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(settings));
  }

  private applyTheme(isInverted: boolean): void {
    const body = document.body;

    if (isInverted) {
      body.classList.add('inverted-theme');
    } else {
      body.classList.remove('inverted-theme');
    }
  }
}
