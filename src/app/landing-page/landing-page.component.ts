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
  get clients$() {
    return this.sm.clients$;
  }

  constructor(private sm: ServicesManager) {
    console.log(this);
  }
}
