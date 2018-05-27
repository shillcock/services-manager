import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { CommandsComponent } from './commands/commands.component';

const routes: Routes = [
  {
    path: ':clientId',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: 'commands', pathMatch: 'full' },
      { path: 'commands', component: CommandsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
