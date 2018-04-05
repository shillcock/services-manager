import { Component } from '@angular/core';

import { CommandHandler } from '@app/core/models';

@Component({
  template: `
    <div class="json-processor">
      <pre>{{data | json}}</pre>
    </div>
  `
})
export class JsonProcessorComponent implements CommandHandler {
  data: any;

  constructor() {
    console.log(this);
  }
}
