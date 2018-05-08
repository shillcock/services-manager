import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ICommand } from '@app/core/models';

@Component({
  selector: 'sm-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent {
  @Input() commands: ICommand[];
  @Output() submit = new EventEmitter();

  constructor() {}

  onSubmit(command: ICommand, payload: any) {
    this.submit.emit({ command, payload });
  }
}
