import { Injectable } from '@angular/core';
import { ServicesManager } from '@app/core';
import { Service, ServiceAction } from '@app/core/models';
import { map } from 'rxjs/operators';

@Injectable()
export class ActionService {
  constructor(private sm: ServicesManager) {}

  getAction(service: Service, action: ServiceAction) {
    const action$ = this.sm
      .getAction(service, action.type)
      .pipe(map(data => console.log('DATA:', data)));

    return action$;
  }
}
