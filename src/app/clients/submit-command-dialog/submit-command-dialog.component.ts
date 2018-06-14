import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs/Subscription';

import { CommandService } from '@app/core';

@Component({
  selector: 'sm-submit-command-dialog',
  templateUrl: './submit-command-dialog.component.html',
  styleUrls: ['./submit-command-dialog.component.scss']
})
export class SubmitCommandDialogComponent implements OnDestroy {
  working = true;
  result: any;

  readonly sub: Subscription;

  get statusOk() {
    const status = _.get(this.result, 'status');
    return status !== 'error';
  }

  get statusIcon() {
    return this.statusOk ? 'checkmark-outline' : 'exclamation-solid';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rpc: CommandService
  ) {
    const { command, payload, meta } = data;
    if (command) {
      this.sub = this.rpc
        .sendCommand(command, payload, meta)
        .subscribe(result => {
          this.result = result;
          this.working = false;
        });
    } else {
      this.result = {
        status: 'error',
        message: 'Failed sending command. Command can not be empty.'
      };
      this.working = false;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
