import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = "";

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private subirArchivoService: SubirArchivoService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.email, Validators.required]]
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe(resp => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire("Sucess", "Usuario actualizado", "success");
    }, (error) => {
      Swal.fire("Error", error.error.msg, "error");
    });
  }

  cambiarImagen(data: File) {
    this.imagenSubir = data;

    if (!data) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(data);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.subirArchivoService.actualizarFoto(this.imagenSubir, "usuarios", this.usuario.id).then(img => {
      this.usuario.img = img
    })
  }

}
