import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  settings: Settings = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor( @Inject ( DOCUMENT ) private _document ) {
    this.loadSettings();
   }

  saveSettings() {

    localStorage.setItem('settings', JSON.stringify(this.settings) );
  }


  loadSettings() {

    if ( localStorage.getItem('settings') ) {
      this.settings = JSON.parse(localStorage.getItem('settings'));


      this.applySettings ( this.settings.theme );

    } else {


      this.applySettings( this.settings.theme );
    }


  }

  applySettings( theme: string ) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url  );

    this.settings.theme = theme;
    this.settings.urlTheme = url;

    this.saveSettings();
  }

}

interface Settings {
  urlTheme: string;
  theme: string;
}
