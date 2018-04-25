import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { CommandService } from '@app/core';

@Component({
  selector: 'sm-submit-command-dialog',
  templateUrl: './submit-command-dialog.component.html',
  styleUrls: ['./submit-command-dialog.component.scss']
})
export class SubmitCommandDialogComponent implements OnInit {
  working = true;
  result: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rpc: CommandService) {
    const { command, payload } = data;
    this.rpc
      .sendCommand(command, payload)
      .subscribe(result => {
        this.result = result;
        this.working = false;
      });
  }

  get statusOk() {
    const { status } = this.result || { status: 'error' };
    return status === 'ok';
  }

  get statusIcon() {
    return this.statusOk ? 'check_circle' : 'error';
  }

  ngOnInit() {
  }
}
