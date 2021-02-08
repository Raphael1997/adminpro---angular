import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public titulo: string;
  public tituloSubs: Subscription;

  constructor(private router: Router) {

    this.tituloSubs = this.obtenerBreadcrumb().subscribe(({ titulo }) => {
      this.titulo = titulo;
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tituloSubs.unsubscribe();
  }

  obtenerBreadcrumb() {

    return this.router.events.pipe(
      filter(resp => resp instanceof ActivationEnd),
      filter((resp: ActivationEnd) => resp.snapshot.firstChild === null),
      map((resp: ActivationEnd) => resp.snapshot.data)
    );
  }

}
