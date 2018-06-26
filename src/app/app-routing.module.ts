import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'history', component: HistoryPageComponent },
  { path: 'client', loadChildren: './clients/clients.module#ClientsModule' },
  { path: 'config', loadChildren: './configs/configs.module#ConfigsModule' },
  { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
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
