import { Component, OnInit } from '@angular/core';
import { MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['HTML', 'CSS', 'JS'];
  public labels2: string[] = ['Publicidad', 'Produccion', 'Servicios creativos'];
  public labels3: string[] = ['Matemáticas', 'Fisica', 'Dibujo tecnico'];
  public labels4: string[] = ['Fútbol', 'Video games', 'Fiesta'];

  // Doughnut
  public charData1: MultiDataSet = [[50, 100, 150]];
  public charData2: MultiDataSet = [[200, 250, 300]];
  public charData3: MultiDataSet = [[350, 400, 450]];
  public charData4: MultiDataSet = [[500, 550, 600]];

}
