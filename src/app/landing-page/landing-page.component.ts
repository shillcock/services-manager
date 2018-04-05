import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { ServicesManager } from '@app/core';
import { Client } from '@app/core/models';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  clients$: Observable<Client[]>;

  constructor(private sm: ServicesManager) {
    this.clients$ = sm.clients$;
  }
}
