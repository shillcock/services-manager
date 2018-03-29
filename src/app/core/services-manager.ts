import { Injectable, OnDestroy } from '@angular/core';
import { Service } from '@app/core/models';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter, map, pluck, take } from 'rxjs/operators';
import 'rxjs/add/observable/empty';

import { AuthService } from '@app/core/auth.service';

@Injectable()
export class ServicesManager implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  services$: Observable<Service[]>;
  services: Service[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
    this.services$ = auth.authState$.pipe(pluck('services'));
    console.log(this);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getService(serviceId: string): Observable<Service> {
    return this.services$.pipe(
      take(1),
      filter(services => !!services),
      map((services: Service[]) =>
        services.find(service => service.id === serviceId)
      )
    );
    // return this.http.get<Service[]>(`${API}/services/${serviceId}`);
  }
}
