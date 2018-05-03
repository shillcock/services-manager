import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommandService } from '@app/core';

@Component({
  selector: 'sm-submit-command-dialog',
  templateUrl: './submit-command-dialog.component.html',
  styleUrls: ['./submit-command-dialog.component.scss']
})
export class SubmitCommandDialogComponent {
  working = true;
  result: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rpc: CommandService
  ) {
    const { command, payload } = data;
    if (command) {
      this.rpc.sendCommand(command, payload).subscribe(result => {
        this.result = result;
        this.working = false;
      });
    } else {
      this.result = {
        status: 'error',
        message: 'Failed sending command. Command can not be empty'
      };
      this.working = false;
    }
  }

  get statusOk() {
    const { status } = this.result || { status: 'error' };
    return status === 'ok';
  }

  get statusIcon() {
    return this.statusOk ? 'checkmark-outline' : 'exclamation-solid';
  }
}
