import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Processor } from '@app/core/models';

@Component({
  template: `
    <div class="json-processor">
      <pre>{{data | json}}</pre>
    </div>
  `
})
export class JsonProcessorComponent implements Processor, OnChanges {
  @Input() data: any;

  constructor() {
    console.log(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes:', changes);
  }
}
