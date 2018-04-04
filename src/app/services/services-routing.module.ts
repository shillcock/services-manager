import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {
    path: ':serviceId/:actionType',
    component: ServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
