import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService,
    private modal: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuario();

    this.imgSubs = this.modal.nuevaImagen.subscribe(img => this.cargarUsuario());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  
  /**
   * 
   */
  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde).subscribe(({ total, usuario }) => {
      this.totalUsuario = total;
      this.usuarios = usuario;
      this.usuariosTemp = usuario;
      this.cargando = false;
    });
  }

  /**
   * 
   * @param usuario 
   */
  abrirModal(usuario: Usuario) {
    this.modal.abrirModal("usuarios", usuario.uid, usuario.img);
  }

  /**
   * 
   * @param valor 
   */
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalUsuario) {
      this.desde -= valor;
    }

    this.cargarUsuario();
  }

  /**
   * 
   */
  buscarUsuario(termino: string) {
    if (termino !== "") {
      this.busquedaService.buscarUsuario("usuarios", termino).subscribe(resp => {
        this.usuarios = resp.usuarios;
      });
    } else {
      this.usuarios = this.usuariosTemp;
    }
  }

  /**
   * 
   * @param usuario 
   */
  borrarUsuario(usuario) {
    if (usuario.uid === this.usuarioService.uidUsuario) {
      return Swal.fire("Error", "No puedes borrarse a si mismo", "error");
    }

    Swal.fire({
      title: '¿Borrar usario?',
      text: `Esta a punto de borrar ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar usuario',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario).subscribe(resp => {
          Swal.fire("Usuario borrado", `${usuario.nombre} fue borrado correctamente`, "success");
          this.cargarUsuario();
        });
      }
    })
  }

  /**
   * 
   * @param usuario 
   */
  cambiarRole(usuario) {
    this.usuarioService.guardarUsuario(usuario).subscribe(resp => {
      console.log(resp);
    });
  }

}
