import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { ServicesManager } from '@app/core';
import { Service } from '@app/core/models';

@Component({
  selector: 'sm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  services$: Observable<Service[]>;

  constructor(private sm: ServicesManager) {
    this.services$ = sm.services$;
  }
}
