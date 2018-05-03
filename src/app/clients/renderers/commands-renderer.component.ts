import { Component } from '@angular/core';

@Component({
  template: `
    <div class="commands-renderer" *ngIf="commands; else noCommands">
      <sm-command-list [commands]="commands"></sm-command-list>
    </div>
    <ng-template #noCommands>
      <h1>Commands not found</h1>
    </ng-template>
  `
})
export class CommandsRendererComponent {
  context: any;

  get commands() {
    if (this.context && this.context.commands) {
      return this.context.commands;
    }
  }
}
