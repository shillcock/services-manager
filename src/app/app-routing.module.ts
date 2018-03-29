import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceResolver } from './core/service-resolver';

import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { ServiceActionComponent } from './pages/service-action/service-action.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'service/:serviceId',
    component: ServiceComponent,
    resolve: { service: ServiceResolver },
    children: [{ path: ':actionType', component: ServiceActionComponent }]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ServiceResolver]
})
export class AppRoutingModule {}
