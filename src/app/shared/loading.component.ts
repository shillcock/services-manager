import { Component, Input } from '@angular/core';

@Component({
  selector: 'sm-loading',
  template: `
    <span class="loading">
        <span *ngIf="text">{{ text }}</span>
        <mat-spinner class="spinner"
          [diameter]="spinnerSize"
          [color]="spinnerColor">
        </mat-spinner>
    </span>
  `,
  styles: [
    `
    .loading {
      display:flex
    }
    .spinner {
      margin-left: 8px;
    }
  `
  ]
})
export class LoadingComponent {
  @Input() text: string;
  @Input() spinnerColor: string;
  @Input() spinnerSize = 18;
}
