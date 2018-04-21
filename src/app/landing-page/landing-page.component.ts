import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { ServicesManager } from '@app/core';
import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  clients$: Observable<IClient[]>;

  constructor(private sm: ServicesManager) {
    this.clients$ = this.sm.clients$;
  }
}
