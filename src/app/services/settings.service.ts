import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTema = document.querySelector("#theme");
  
  constructor() {
    const tema = localStorage.getItem("tema") || './assets/css/colors/default-dark.css';
    this.linkTema.setAttribute("href", tema);
  }

  cambiarTema(tema: string) {

    const url = `./assets/css/colors/${tema}.css`;

    this.linkTema.setAttribute("href", url);

    localStorage.setItem("tema", url);

    this.comprobarTemaActual();
  }

  comprobarTemaActual() {

    const links = document.querySelectorAll(".selector");
    links.forEach(elementos => {
      elementos.classList.remove("working");
      const btnTema = elementos.getAttribute("data-theme");

      const btnTemaUrl = `./assets/css/colors/${btnTema}.css`;
      const temaActual = this.linkTema.getAttribute("href");

      if (btnTemaUrl == temaActual) {
        elementos.classList.add("working");
      }

    })
  }

}
