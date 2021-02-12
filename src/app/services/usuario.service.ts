import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';

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
    return this.usuario.id || "";
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
          localStorage.setItem("token", resp.token)
        })
      );
  }

  actualizarUsuario(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uidUsuario}`, data, {
      headers: {
        "x-token": this.token
      }
    });
  }


  /**
   * 
   * @param formData 
   */
  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token)
        })
      );
  }

  loguot() {
    localStorage.removeItem("token");

    this.auth2.signOut().then(() => {
      this.ngzone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });


  }


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
          localStorage.setItem("token", resp.token)
        })
      );
  }
}
