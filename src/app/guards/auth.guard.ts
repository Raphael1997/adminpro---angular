import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl("/login");
          }
        })
      )

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl("/login");
          }
        })
      )
  }

}
