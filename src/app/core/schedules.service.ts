import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { API } from '@app/shared/consts';

import { ISchedule } from './models';

interface ISchedulesMap {
  [id: string]: ISchedule;
}

@Injectable()
export class SchedulesService {
  private schedulesMap$?: Observable<ISchedulesMap>;
  
  get schedules$() {
    this.schedulesMap$ = this.http
      .get<ISchedulesMap>(API.schedules);    
    
    return this.schedulesMap$;
  }

  constructor(private http: HttpClient) { } 
  
  upsertSchedules(schedules: any) {
    return this.http
      .post(API.schedules, schedules);
  }
    
}
