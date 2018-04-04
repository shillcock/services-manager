import { Component } from '@angular/core';

import { Processor } from '@app/core/models';

@Component({
  template: `
    <div class="rpc-processor" *ngIf="data">
        <sm-rpc-list [items]="data" (selected)="currentItem = $event"></sm-rpc-list>
    </div>
  `
})
export class RpcProcessorComponent implements Processor {
  data: any;
  currentItem;

  constructor() {
    console.log(this);
  }
}
