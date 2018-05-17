import { Component, Input, ViewEncapsulation } from '@angular/core';
import { syntaxHighlight } from './helpers';

@Component({
  selector: 'sm-json',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent {
  @Input() data: any;
  @Input() syntaxHighlight = true;

  get json() {
    if (this.data) {
      const json = JSON.stringify(this.data, null, 2);
      return this.syntaxHighlight ? syntaxHighlight(json) : json;
    }
  }
}
