import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ICommand } from '@app/core/models';

@Injectable()
export class CommandService {
  constructor(private http: HttpClient) {}

  sendCommand(command: ICommand, payload?: any): Observable<any> {
    const { endpoint } = command;
    const method = command.method || 'POST';

    return this.get(method, endpoint, payload).pipe(
      delay(2000), // FIXME: Temp only
      catchError(err => this.handleError(err))
    );
  }

  private get(method: 'GET' | 'POST', endpoint: string, payload: any) {
    return method === 'GET'
      ? this.http.get<any>(endpoint)
      : this.http.post<any>(endpoint, payload);
  }

  private handleError(err: any) {
    console.log('handleError:', err);
    const message = err.message || err.toString();
    return of({ status: 'error', message });
  }
}
