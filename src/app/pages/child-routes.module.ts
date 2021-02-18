import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard } from '../guards/admin.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: "", component: DashboardComponent, data: { titulo: "Dashboard" } },
  { path: "progress", component: ProgressComponent, data: { titulo: "Progress" } },
  { path: "grafica1", component: Grafica1Component, data: { titulo: "Grafica" } },
  { path: "promesa", component: PromesasComponent, data: { titulo: "Promesa" } },
  { path: "perfil", component: PerfilComponent, data: { titulo: "Perfil usuario" } },
  { path: "rxjs", component: RxjsComponent, data: { titulo: "RXJS" } },
  { path: "buscar/:termino", component: BusquedasComponent, data: { titulo: "Busquedas" } },
  { path: "configuraciones-usuario", component: AccountSettingsComponent, data: { titulo: "Tema" } },

  //Mantenimientos
  { path: "hospitales", component: HospitalesComponent, data: { titulo: "Hospital de aplicación" } },
  { path: "medicos", component: MedicosComponent, data: { titulo: "Medico de aplicación" } },
  { path: "medico/:id", component: MedicoComponent, data: { titulo: "Medico de aplicación" } },

  // Admin ruta
  { path: "usuarios", component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: "Usuario de aplicación" } },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
