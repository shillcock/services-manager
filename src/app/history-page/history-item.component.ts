import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-history-item',
  template: `
    <mat-card>
      <mat-card-title fxLayout="row">
        <span class="mat-title">{{action}}</span>
        <span fxFlex="1 1 auto"></span>
        <span class="mat-subheading-1">{{createdAt}}</span>
      </mat-card-title>
      <mat-card-content>
        <sm-json [data]="payload"></sm-json>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    mat-card {
      margin: 15px;
    }
    mat-card-title,
    .mat-title,
    .mat-subheading-1 {
      margin-bottom: 0px;
    }
  `
  ]
})
export class HistoryItemComponent {
  @Input() data: any;

  get action() {
    return _.get(this.data, 'action');
  }

  get createdAt() {
    return _.get(this.data, 'createdAt');
  }

  get payload() {
    return _.get(this.data, 'payload');
  }
}
