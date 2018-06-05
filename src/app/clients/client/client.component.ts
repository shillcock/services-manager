import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { IClient } from '@app/core/models';
import { ClientsService } from '@app/core/services/clients.service';

@Component({
  selector: 'sm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client$: Observable<IClient>;

  constructor(private route: ActivatedRoute, private cs: ClientsService) {
    this.client$ = this.cs.selectedClient$;
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(paramMap => paramMap.get('clientId')))
      .subscribe(clientId => this.cs.selectClient(clientId || undefined));
  }
}
