import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { filter } from 'rxjs/operators';

import { CommandService } from '@app/core';
import { ICommand } from '@app/core/models';

import { SubmitCommandDialogComponent } from '../submit-command-dialog/submit-command-dialog.component';

@Component({
  selector: 'sm-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent {
  @Input() commands: ICommand[];

  constructor(private dialog: MatDialog, private rpc: CommandService) {}

  onSubmit(command: ICommand, payload: any) {
    const config = {
      disableClose: true,
      minWidth: 400,
      data: { command, payload }
    };

    const dialogRef = this.dialog.open(SubmitCommandDialogComponent, config);
    dialogRef.afterClosed().subscribe(res => console.log('DIALOG CLOSED:', res));
  }
}
