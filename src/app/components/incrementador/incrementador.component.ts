import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  @Input() btnClase: string = "btn-primary";

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.btnClase = `btn ${this.btnClase}`;
  }

  onChange(valor: number) {

    if (valor >= 100) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0
    } else {
      this.progreso = valor;
    }

    if (valor == null) {
      this.valorSalida.emit(0);
    }

    this.valorSalida.emit(this.progreso);

  }
  /*   get getPorcentaje() {
      return `${this.progreso}%`;
    } */

  cambiarValor(valor: number) {


    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }

}
