import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { SchedulesComponent } from './schedules/schedules.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  {
    path: 'client',
    loadChildren: './clients/clients.module#ClientsModule'
  },
  {
    path: 'scheduling',
    component: SchedulesComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
