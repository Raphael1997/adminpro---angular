import { Component } from '@angular/core';

@Component({
  selector: 'app-progres',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 25;
  progreso2: number = 45;

  get getProgeso1() {
    return `${this.progreso1}%`
  }

  get getProgeso2() {
    return `${this.progreso2}%`
  }

}
