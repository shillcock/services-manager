import { Component } from '@angular/core';

@Component({
  template: `
    <div class="default-renderer">
      <pre>{{context | json}}</pre>
    </div>
  `,
  styles: [
    `
    .default-renderer {
      background-color: #eee;
    }
  `
  ]
})
export class DefaultRendererComponent {
  context: any;
}
