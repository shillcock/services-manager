import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { ClientsService, CommandService } from '@app/core';
import { ICommand } from '@app/core/models';

@Component({
  selector: 'sm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  commands: ICommand[] = [];

  constructor(
    private clientsService: ClientsService,
    private rpc: CommandService
  ) {
    clientsService.reportingCommands$.subscribe(commands => {
      console.log('commands:', commands);
      this.commands = commands.map(command => ({
        ...command,
        report$: this.getReport(command)
      }));
    });
  }

  ngOnInit() {}

  private getReport(command: ICommand) {
    return this.rpc.sendCommand(command);
  }
}
