import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public medicoTemp: Medico[];
  public cargando: boolean = false;
  public imgSubs: Subscription;
  constructor(private medicoService: MedicoService, private modal: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedico();

    this.imgSubs = this.modal.nuevaImagen.subscribe(img => this.cargarMedico());
  }

  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();
  }

  /**
   * 
   */
  cargarMedico() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((resp: Medico[]) => {
      this.medicos = resp;
      this.cargando = false;
      this.medicoTemp = resp;
    });
  }

  /**
   * 
   * @param termino 
   */
  buscarMedico(termino: string) {
    if (termino !== "") {
      this.busquedaService.buscarColeccion('medicos', termino).subscribe((resp: any) => {

        this.medicos = resp.resultado;
      })
    } else {
      this.medicos = this.medicoTemp;
    }
  }

  /**
   * 
   * @param medico 
   */
  abrirModal(medico: Medico) {

    this.modal.abrirModal("medicos", medico._id, medico.img);
  }

  
  /**
   * 
   * @param medico 
   */
  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar usario?',
      text: `Esta a punto de borrar ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar usuario',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe(resp => {
          Swal.fire("Usuario borrado", `${medico.nombre} fue borrado correctamente`, "success");
          this.cargarMedico();
        });
      }
    })
  }

}
