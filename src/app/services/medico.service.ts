import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem("token");
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  /**
  * 
  */
  cargarMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headers)
      .pipe(
        map((medicos: { ok: boolean, medico: Medico[] }) => medicos.medico)
      )
  }

  /**
   * 
   * @param id 
   */
  obtenerMedicoID(id: string) {
    return this.http.get(`${base_url}/medicos/${id}`, this.headers)
      .pipe(
        map((medicos: { ok: boolean, medico: Medico }) => medicos.medico)
      )
  }




  /**
   * 
   * @param medico 
   */
  crearMedico(medico: { nombre: string, hospital: string }) {
    return this.http.post(`${base_url}/medicos`, medico, this.headers);
  }

  /**
   * 
   * @param medico 
   */
  actualizarMedico(medico: Medico) {
    return this.http.put(`${base_url}/medicos/${medico._id}`, medico, this.headers);
  }

  /**
   * 
   * @param id 
   */
  borrarMedico(id: string) {
    return this.http.delete(`${base_url}/medicos/${id}`, this.headers);
  }
}
