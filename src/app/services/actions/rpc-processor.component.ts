import { Component, Input } from '@angular/core';

import { Processor } from '@app/core/models';

@Component({
  template: `
    <div class="rpc-processor" *ngIf="data">
      <mat-list>
        <mat-list-item *ngFor="let item of data">{{item.label}}</mat-list-item>
      </mat-list>
    </div>
  `
})
export class RpcProcessorComponent implements Processor {
  @Input() data: any;
}
