import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, take } from 'rxjs/operators';

import { ClientsService } from '@app/core';
import { ICommand } from '@app/core/models';

import { SubmitCommandDialogComponent } from '../submit-command-dialog/submit-command-dialog.component';

@Component({
  selector: 'sm-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnDestroy {
  private destroyed$ = new Subject<boolean>();

  client$ = this.cs.selectedClient$;
  commands$: Observable<ICommand[]>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cs: ClientsService
  ) {
    this.commands$ = this.client$.pipe(
      map(client => _.get(client, 'commands')),
      map(commands => _.toArray(commands))
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  onSubmit(event: any) {
    const { command, payload } = event;

    this.client$.pipe(take(1)).subscribe(client => {
      const config = {
        disableClose: true,
        minWidth: 400,
        data: {
          client,
          command,
          payload,
          meta: { clientId: _.get(client, 'id') }
        }
      };

      const dialogRef = this.dialog.open(SubmitCommandDialogComponent, config);
      dialogRef.afterClosed().subscribe(res => {
        // TODO: maybe shove the results into a commands log for later review
      });
    });
  }
}
