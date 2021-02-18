import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { CargarUsuario } from '../interfaces/cargar-usuario.interfaces';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;


  constructor(private http: HttpClient, private router: Router, private ngzone: NgZone) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get uidUsuario(): string {
    return this.usuario.uid || "";
  }

  get role(): "ADMIN_ROLE" | "USER_ROLE" {
    return this.usuario.role;
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  /**
   * Renovar token
   */
  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, img = "**", role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, "", google, img, role, uid);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("menu", JSON.stringify(resp.menu));
        return true;
      }),
      catchError(error => of(false)) // regresa un Observable
    );

  }

  /**
   * 
   * @param formData 
   */
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
          localStorage.setItem("menu", JSON.stringify(resp.menu));
        })
      );
  }

  /**
   * 
   * @param data 
   */
  actualizarUsuario(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uidUsuario}`, data, this.headers);
  }

  /**
   * 
   * @param usuario 
   */
  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

  /**
   * 
   * @param desde 
   */
  cargarUsuario(desde: number) {

    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map(resp => {
          const usuario = resp.usuario.map(user => new Usuario(user.nombre, user.email, "",
            user.google, user.img, user.role, user.uid));
          return {
            total: resp.total,
            usuario
          };
        })
      )
  }

  /**
   * 
   * @param usuario 
   */
  borrarUsuario(usuario: Usuario) {
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);

  }

  /**
   * 
   * @param formData 
   */
  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
          localStorage.setItem("menu", JSON.stringify(resp.menu));
        })
      );
  }

  /**
   * 
   */
  //TODO: borrar menu
  loguot() {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    this.auth2.signOut().then(() => {
      this.ngzone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });


  }

  /**
   * 
   */
  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1006654341252-ia4fh046kt7obgs2a605vtkevv2p9u4r.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(0);
      });
    })

  }

  /**
   * 
   * @param token 
   */
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
          localStorage.setItem("menu", JSON.stringify(resp.menu));
        })
      );
  }
}
