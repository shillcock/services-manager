import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

import 'lodash';

import { ClientComponent } from './client.component';
import { SharedModule } from '@app/shared';
import { CommandsComponent } from '@app/clients/commands/commands.component';
import { ClientsService, CommandService, SidebarService } from '@app/core';

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

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), SharedModule],
      declarations: [ClientComponent, CommandsComponent],
      providers: [ClientsService, CommandService, SidebarService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
