import { Component, Input } from '@angular/core';

import { ICommand } from '@app/core/models';

@Component({
  selector: 'sm-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent {
  @Input() commands: ICommand[];
}
