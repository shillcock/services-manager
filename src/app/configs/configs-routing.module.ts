import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigResolver } from './config.resolver';
import { ConfigComponent } from './config/config.component';
import { CanDeactivateGuard } from '@app/core/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: ':configId',
    component: ConfigComponent,
    runGuardsAndResolvers: 'always',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      config: ConfigResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule {}
