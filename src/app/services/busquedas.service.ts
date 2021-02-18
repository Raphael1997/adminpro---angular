import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';
import { Usuario } from '../models/usuario.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  buscarUsuario(tipo: "usuarios" | "hospitales" | "medicos", termino: string = "") {

    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = resp.resultado.map(user => new Usuario(user.nombre, user.email, "",
            user.google, user.img, user.role, user.id));
          return {
            usuarios
          }
        })
      )
  }

  /**
   * 
   * @param tipo 
   * @param termino 
   */
  buscarColeccion(tipo: "usuarios" | "hospitales" | "medicos", termino: string = "") {

    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers);
  }

  /**
   * 
   * @param termino 
   */
  buscarGlobal(termino: string = "") {

    return this.http.get<any[]>(`${base_url}/todo/${termino}`, this.headers);
  }


}
