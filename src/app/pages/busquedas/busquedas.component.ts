import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.models';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css'],
  
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  constructor(private activatedRouter: ActivatedRoute, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ termino }) => {

      this.busquedaGlobal(termino);
    });
  }

  /**
   * 
   * @param termino 
   */
  busquedaGlobal(termino: string) {
    this.busquedaService.buscarGlobal(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuario;
      this.medicos = resp.medico;
      this.hospitales = resp.hospital;
    });
  }

}
