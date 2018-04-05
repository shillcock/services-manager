import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientComponent } from './client/client.component';
import { CommandProcessorComponent } from './command-processor/command-processor.component';
import { JsonProcessorComponent } from './actions/json-processor.component';
import { RpcProcessorComponent } from './actions/rpc-processor.component';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [
    ClientComponent,
    CommandProcessorComponent,
    JsonProcessorComponent,
    RpcProcessorComponent
  ],
  entryComponents: [JsonProcessorComponent, RpcProcessorComponent]
})
export class ClientsModule {}
