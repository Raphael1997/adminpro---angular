import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario;

  constructor(private _service: SidebarService, private usuarioServicio: UsuarioService) {
    this.usuario = usuarioServicio.usuario;
    this.menuItems = this._service.menu;
  }

  ngOnInit(): void {
  }

}
