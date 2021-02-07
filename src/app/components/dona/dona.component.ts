import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo: string = "";
  @Input() labels: Label[] = [];
  @Input() dataSet: MultiDataSet[];

  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    {
      backgroundColor: ['#000000', '#242956', '#4b6500'],
      hoverBackgroundColor: ['#1d1d1d', '#0b0a14', '#7c8f37'],
      hoverBorderColor: ['#22243a', '#822e2e', '#c66d00']
    }
  ]

}
