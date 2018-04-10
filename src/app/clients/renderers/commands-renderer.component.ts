import { Component } from '@angular/core';

import { ServiceRenderer } from '@app/core/models';

@Component({
  template: `
    <div class="commands-renderer" *ngIf="context; else loading">
        <sm-command-list [commands]="commands"></sm-command-list>
    </div>
    <ng-template #loading><p>Loading...</p></ng-template>
  `
})
export class CommandsRendererComponent implements ServiceRenderer {
  context: any;

  get commands() {
    return this.context.body.commands;
  }
}
