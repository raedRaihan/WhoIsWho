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
    console.log('Settings updated:', settings);
  }

  resetSettings(): void {
    this.saveSettingsToLocalStorage(this.defaultSettings);
    console.log('Settings reset to defaults');
  }

  private loadSettingsFromLocalStorage(): any {
    const settings = localStorage.getItem(this.localStorageKey);
    if (settings) {
      return JSON.parse(settings);
    } else {
      this.saveSettingsToLocalStorage(this.defaultSettings);
      return this.defaultSettings;
    }
  }

  private saveSettingsToLocalStorage(settings: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(settings));
  }
}
