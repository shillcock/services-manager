import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ServicesRoutingModule } from './services-routing.module';

import { ServiceComponent } from './service/service.component';
import { ActionProcessorComponent } from './actions/action-processor/action-processor.component';
import { ProcessorTargetDirective } from './actions/processor-target.directive';
import { JsonProcessorComponent } from './actions/json-processor.component';
import { RpcProcessorComponent } from './actions/rpc-processor.component';

@NgModule({
  imports: [SharedModule, ServicesRoutingModule],
  declarations: [
    ServiceComponent,
    ActionProcessorComponent,
    ProcessorTargetDirective,
    JsonProcessorComponent,
    RpcProcessorComponent
  ],
  entryComponents: [JsonProcessorComponent, RpcProcessorComponent]
})
export class ServicesModule {}
