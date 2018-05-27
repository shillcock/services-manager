import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ServicesManager } from '@app/core';
import { IClient, ICommand } from '@app/core/models';
import { SubmitCommandDialogComponent } from '../submit-command-dialog/submit-command-dialog.component';

@Component({
  selector: 'sm-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();

  client: IClient;
  commands: ICommand[];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sm: ServicesManager
  ) {}

  ngOnInit() {
    this.sm.client$.pipe(takeUntil(this.destroyed$)).subscribe(client => {
      this.client = client;
      this.commands = _.toArray(_.get(client, 'commands'));
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit(event: any) {
    const { command, payload } = event;

    const config = {
      disableClose: true,
      minWidth: 400,
      data: {
        client: this.client,
        command,
        payload,
        meta: { clientId: this.client.id }
      }
    };

    const dialogRef = this.dialog.open(SubmitCommandDialogComponent, config);
    dialogRef.afterClosed().subscribe(res => {
      // TODO: maybe shove the results into a commands log for later review
    });
  }
}
