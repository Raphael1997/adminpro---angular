import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public hospitalTemp: Hospital[] = [];
  constructor(private hospitalService: HospitalService, private modal: ModalImagenService,
    private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.cargarHospital();

    this.imgSubs = this.modal.nuevaImagen.subscribe(img => this.cargarHospital());
  }

  buscarHospital(buscador: string) {
    if (buscador !== "") {
      this.busquedaService.buscarHospital('hospitales', buscador).subscribe((resp: any) => {
        console.log(resp);

        this.hospitales = resp.resultado;
      })
    } else {
      this.hospitales = this.hospitalTemp;
    }


  }
  /**
   * 
   */
  cargarHospital() {
    this.hospitalService.cargarHospitales().subscribe(resp => {
      this.hospitales = resp;
      this.cargando = false;
      this.hospitalTemp = this.hospitales;
    });
  }

  /**
   * 
   * @param hospital 
   */
  guardarCambios(hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe((resp: any) => {
      Swal.fire("Actualizado", resp.hospital.nombre, "success")
    });

  }

  /**
   * 
   * @param hospital 
   */
  borrarHospital(hospital) {

    this.hospitalService.borrarHospital(hospital._id).subscribe((resp: any) => {
      this.cargarHospital();
      Swal.fire("Borrado", hospital.nombre, "success");
    });
  }

  /**
   * 
   */
  async abrirModalHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      console.log("entra");

      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
        });
    }
  }

  /**
   * 
   * @param hospital 
   */
  abrirModal(hospital: Hospital) {
    this.modal.abrirModal("hospitales", hospital._id, hospital.img);
  }

}
