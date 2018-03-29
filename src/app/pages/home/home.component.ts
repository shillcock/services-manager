import { Component, OnDestroy } from '@angular/core';
import { AuthService, Service } from '@app/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil, pluck } from 'rxjs/operators';

@Component({
  selector: 'sm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();
  services: Service[];

  constructor(private auth: AuthService) {
    auth.authState$
      .pipe(pluck('services'), takeUntil(this.destroy$))
      .subscribe((services: Service[]) => {
        this.services = services;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
