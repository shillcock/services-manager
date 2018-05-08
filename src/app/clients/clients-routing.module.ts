import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client';
import { CommandsComponent } from './commands/commands.component';
import { ClientResolver } from '@app/clients/client.resolver';

const routes: Routes = [
  {
    path: ':clientId',
    component: ClientComponent,
    resolve: {
      client: ClientResolver
    },
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
