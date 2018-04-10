import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientComponent } from './client';
import { ServiceComponent } from './service';

import {
  DefaultRendererComponent,
  JsonRendererComponent,
  CommandsRendererComponent
} from './renderers';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [
    ClientComponent,
    ServiceComponent,
    DefaultRendererComponent,
    JsonRendererComponent,
    CommandsRendererComponent
  ],
  entryComponents: [
    DefaultRendererComponent,
    JsonRendererComponent,
    CommandsRendererComponent
  ]
})
export class ClientsModule {}
