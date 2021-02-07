import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _servicio: SettingsService) { }

  ngOnInit(): void {
   
    this._servicio.comprobarTemaActual();
  }
  cambiarTema(tema: string) {

    this._servicio.cambiarTema(tema);

  }

}
