import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFuncion();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private _servicio: SettingsService, private sidebarService: SidebarService) { }

  ngOnInit(): void {

    //Inicializar los plugins
    customInitFuncion();

    this.sidebarService.cargarMenu();
  }
}
