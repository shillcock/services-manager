import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config/config.component';
import { CanDeactivateGuard } from '@app/core/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: ':configId',
    component: ConfigComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule {}
