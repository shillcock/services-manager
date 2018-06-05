import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IClient } from '@app/core/models';
import { ClientsService } from '@app/core';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  clients$: Observable<IClient[]> = this.clientsService.clients$;

  constructor(private clientsService: ClientsService) {}
}
