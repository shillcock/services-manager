import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IClient, ICommand } from '@app/core/models';

import { SubmitCommandDialogComponent } from '@app/clients/submit-command-dialog/submit-command-dialog.component';

@Component({
  selector: 'sm-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  client: IClient;
  commands: ICommand[];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    if (this.route && this.route.parent) {
      this.route.parent.data.subscribe((data: { client: IClient }) => {
        if (data && data.client) {
          this.client = data.client;
          this.commands = Object.keys(this.client.commands).map(
            key => this.client.commands[key]
          );
        }
      });
    }
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
    dialogRef
      .afterClosed()
      .subscribe(res => console.log('DIALOG CLOSED:', res));
  }
}
