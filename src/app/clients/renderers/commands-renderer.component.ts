import { Component } from '@angular/core';

import { get } from 'lodash';

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
    return get(this.context, 'data.commands');
  }
}
