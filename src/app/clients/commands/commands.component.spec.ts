import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommandsComponent } from './commands.component';
import { SharedModule } from '@app/shared';
import { Routes } from '@angular/router';
import { ClientComponent } from '@app/clients/client/client.component';
import { ClientsService } from '@app/core';

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

describe('CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), SharedModule],
      declarations: [ClientComponent, CommandsComponent],
      providers: [ClientsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
