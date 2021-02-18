import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(private usuarioServicio: UsuarioService, private router: Router) {
    this.usuario = usuarioServicio.usuario;

  }


  logout() {
    this.usuarioServicio.loguot();
  }

  busquedaGeneral(valor: string) {

    if (valor.length === 0) {
      console.log(valor.length);

      return this.router.navigateByUrl("/dashboard")
    }

    this.router.navigateByUrl(`/dashboard/buscar/${valor}`);
  }

}
