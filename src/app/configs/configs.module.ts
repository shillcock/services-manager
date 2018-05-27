import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsService } from './configs.service';

import { ConfigComponent } from './config/config.component';
import { ConfigViewComponent } from './config-view/config-view.component';
import { ConfigEditComponent } from './config-edit/config-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConfigsRoutingModule
  ],
  providers: [ConfigsService],
  declarations: [ConfigViewComponent, ConfigEditComponent, ConfigComponent]
})
export class ConfigsModule {}
