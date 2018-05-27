import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { map, take, takeUntil } from 'rxjs/operators';

import { AlertService, ServicesManager } from '@app/core';
import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  client: IClient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertService,
    private sm: ServicesManager
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroyed$), map(p => p.get('clientId')))
      .subscribe(clientId => this.sm.fetchClient(clientId));

    this.sm.client$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(client => (this.client = client));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
