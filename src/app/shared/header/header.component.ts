import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(private usuarioServicio: UsuarioService) {
    this.usuario = usuarioServicio.usuario;

  }


  logout() {
    this.usuarioServicio.loguot();
  }

}
