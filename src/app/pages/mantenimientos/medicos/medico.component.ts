import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ["", Validators.required],
      hospital: ["", Validators.required],
    });

    this.cargarHospitales();

    this.obtenerMedicoSeleccionado();
    this.activateRouter.params.subscribe(({ id }) => {

      this.cargarMedico(id);
    });


  }

  /**
   * 
   * @param id 
   */
  cargarMedico(id: string) {
    if (id === "nuevo") return;

    this.medicoService.obtenerMedicoID(id).pipe(delay(100)).subscribe((resp: any) => {
      const { nombre, hospital: { _id } } = resp;
      this.medicoSeleccionado = resp;

      this.medicoForm.setValue({ nombre, hospital: _id });

    }, (error) => {
      return this.router.navigateByUrl("/dashboard/medicos");
    });
  }

  /**
   * 
   */
  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospital: Hospital[]) => {

      this.hospitales = hospital;
    });
  }


  /**
   * 
   */
  guardarMedico() {

    const { nombre } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // actualizar medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe(resp => {
        console.log(resp);
        Swal.fire("Medico actualizado", `${nombre}`, "success");
      })
    } else {
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {

        Swal.fire("Medico creado", `${nombre}`, "success");
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      });
    }


  }

  /**
   * 
   */
  obtenerMedicoSeleccionado() {
    this.medicoForm.get("hospital").valueChanges.subscribe(hospitalS => {
      this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalS);
    });
  }

}
