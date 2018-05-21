import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientComponent } from './client';

import { CommandsComponent } from './commands/commands.component';
import { SubmitCommandDialogComponent } from './submit-command-dialog/submit-command-dialog.component';
import { ClientResolver } from './client.resolver';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [
    ClientComponent,
    CommandsComponent,
    SubmitCommandDialogComponent
  ],
  providers: [ClientResolver],
  entryComponents: [SubmitCommandDialogComponent]
})
export class ClientsModule {}
