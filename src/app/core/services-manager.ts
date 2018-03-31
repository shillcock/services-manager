import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, pluck, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Service, ServiceAction } from './models';

@Injectable()
export class ServicesManager {
  services$: Observable<Service[]>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.services$ = auth.authState$.pipe(pluck('services'));
  }

  getService(serviceId: string): Observable<Service> {
    return this.services$.pipe(
      take(1),
      map((services: Service[]) => {
        return services.find(service => service.id === serviceId);
      })
    );
  }

  getAction(service: Service, actionType: string): Observable<any> {
    return this.http.get<any>(`${service.baseUrl}/${actionType}`).pipe(take(1));
  }
}
