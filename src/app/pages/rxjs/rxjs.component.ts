import { Component } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  public intervalSubs: Subscription;

  constructor() {

    this.intervalSubs = this.retornaInterval().subscribe(resp => console.log(resp));

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe();
  }

  retornaInterval() {

    const intervalo = interval(1000)
      .pipe(
        // take(10),
        map(valor => {
          return (valor + 1)
        }),
        filter(valor => valor % 2 == 0),
      );

    return intervalo;
  }


  retornaObserver(): Observable<number> {
    let i = -1;

    const obs = new Observable<number>(observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error("i llego a 2");

        }
      }, 1000)
    });

    return obs;
  }
}
