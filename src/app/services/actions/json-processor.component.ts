import { Component } from '@angular/core';

import { Processor } from '@app/core/models';

@Component({
  template: `
    <div class="json-processor">
      <pre>{{data | json}}</pre>
    </div>
  `
})
export class JsonProcessorComponent implements Processor {
  data: any;

  constructor() {
    console.log(this);
  }
}
