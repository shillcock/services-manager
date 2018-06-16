import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ClientsService } from '@app/core';
import { IClient } from '@app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnDestroy {
  private destroyed$ = new Subject<boolean>();
  clients: any[];

  constructor(private router: Router, private clientsService: ClientsService) {
    clientsService.clients$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(clients => {
        this.clients = clients.map(client => ({
          ...client,
          health$: this.getHealth(client)
        }));
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  goToReports(clientId: string) {
    // this.router.navigate(['reports', clientId]);
  }

  private getHealth(client: IClient) {
    return this.clientsService.getClientHealth(client);
  }
}
