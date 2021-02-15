import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = "";

  constructor(public modal: ModalImagenService, private usuarioService: UsuarioService,
    public subirArchivoService: SubirArchivoService) { }

  ngOnInit(): void { }

  /**
   * 
   */
  cerrarModal() {
    this.imgTemp = null;
    this.modal.cerrarModal();
  }

  /**
   * 
   * @param data 
   */
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

  /**
   * 
   */
  subirImagen() {
    const id = this.modal.id;
    const tipo = this.modal.tipo;
    this.subirArchivoService.actualizarFoto(this.imagenSubir, tipo, id).then(img => {
      Swal.fire("Guardado", "Imagen actualizada", "success");
      this.modal.nuevaImagen.emit(img);
      this.cerrarModal();
    });
  }

}
