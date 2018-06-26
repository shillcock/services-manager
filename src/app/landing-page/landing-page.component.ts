import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ClientsService } from '@app/core';
import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  clients: any[];

  constructor(private router: Router, private clientsService: ClientsService) {}

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  refresh() {
    this.destroyed$.next(true);
    this.destroyed$ = new Subject<boolean>();
    this.clientsService.clients$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(clients => {
        this.clients = clients.map(client => ({
          ...client,
          health$: this.getHealth(client)
        }));
      });
  }

  goToReports(clientId: string) {
    //this.router.navigate(['reports', clientId]);
    this.router.navigate(['reports']);
  }

  private getHealth(client: IClient) {
    return this.clientsService.getClientHealth(client);
  }
}
