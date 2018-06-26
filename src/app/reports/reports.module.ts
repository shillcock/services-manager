import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, SharedModule, ReportsRoutingModule],
  declarations: [ReportsComponent]
})
export class ReportsModule {}
