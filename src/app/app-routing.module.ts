import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ClientComponent } from '@app/clients/client/client.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'client/:clientId/:serviceId',
    component: ClientComponent
  },
  // {
  //   path: 'clients',
  //   loadChildren: 'app/clients/clients.module#ClientsModule'
  // },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
