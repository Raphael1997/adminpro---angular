import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngzone: NgZone) {

    this.googleInit();
  }

  /**
   * Renovar token
   */
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem("token") || "";

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
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
