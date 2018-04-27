import { Component } from '@angular/core';

@Component({
  template: `
    <div class="commands-renderer">
      <sm-command-list [commands]="commands"></sm-command-list>
    </div>
  `
})
export class CommandsRendererComponent {
  context: any;

  get commands() {
    const {
      data: { commands }
    } = this.context;
    return commands;
  }
}
