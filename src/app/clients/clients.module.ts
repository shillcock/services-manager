import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { ClientsRoutingModule } from './clients-routing.module';

import { ClientComponent } from './client/client.component';
import { CommandsComponent } from './commands/commands.component';
import { SubmitCommandDialogComponent } from './submit-command-dialog/submit-command-dialog.component';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [
    ClientComponent,
    CommandsComponent,
    SubmitCommandDialogComponent
  ],
  entryComponents: [SubmitCommandDialogComponent]
})
export class ClientsModule {}
