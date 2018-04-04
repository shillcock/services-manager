import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServiceComponent } from '@app/services/service/service.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'service/:serviceId/:actionType',
    component: ServiceComponent
  },
  // {
  //   path: 'service',
  //   loadChildren: 'app/services/services.module#ServicesModule'
  // },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
