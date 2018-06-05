import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { IClient } from '@app/core/models';
import { ClientsService } from '@app/core';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client$: Observable<IClient>;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {
    this.client$ = this.clientsService.selectedClient$;
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(paramMap => paramMap.get('clientId')))
      .subscribe(clientId =>
        this.clientsService.selectClient(clientId || undefined)
      );
  }
}
