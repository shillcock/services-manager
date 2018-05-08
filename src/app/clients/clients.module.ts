import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientComponent } from './client';
import { ServiceComponent } from './service';

/*
import {
  DefaultRendererComponent,
  JsonRendererComponent,
  CommandsRendererComponent
} from './renderers';
*/

import { CommandsComponent } from './commands/commands.component';
import { SubmitCommandDialogComponent } from './submit-command-dialog/submit-command-dialog.component';
import { ClientResolver } from './client.resolver';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [
    ClientComponent,
    ServiceComponent,
    // DefaultRendererComponent,
    // JsonRendererComponent,
    // CommandsRendererComponent,
    CommandsComponent,
    SubmitCommandDialogComponent
  ],
  providers: [ClientResolver],
  entryComponents: [
    SubmitCommandDialogComponent
    // DefaultRendererComponent,
    // JsonRendererComponent,
    // CommandsRendererComponent
  ]
})
export class ClientsModule {}
