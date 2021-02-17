import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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
  cargarHospitales() {
    return this.http.get(`${base_url}/hospitales`, this.headers)
      .pipe(
        map((hospitales: { ok: boolean, hospital: Hospital[] }) => hospitales.hospital)
      )
  }

  /**
   * 
   * @param nombre 
   */
  crearHospital(nombre: string) {
    return this.http.post(`${base_url}/hospitales`, { nombre }, this.headers);
  }

  /**
   * 
   * @param _id 
   * @param nombre 
   */
  actualizarHospital(_id: string, nombre: string) {
    return this.http.put(`${base_url}/hospitales/${_id}`, { nombre }, this.headers);
  }

  /**
   * 
   * @param id 
   */
  borrarHospital(id: string) {
    return this.http.delete(`${base_url}/hospitales/${id}`, this.headers);

  }

}
