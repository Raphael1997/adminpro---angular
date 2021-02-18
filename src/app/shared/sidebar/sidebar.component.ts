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

  public usuario: Usuario;

  constructor(public _service: SidebarService, private usuarioServicio: UsuarioService) {
    this.usuario = usuarioServicio.usuario;
  }

  ngOnInit(): void {
  }

}
