import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServiceComponent } from './services/service/service.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'service/:serviceId/:actionType',
    component: ServiceComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
