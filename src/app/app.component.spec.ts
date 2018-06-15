import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import {
  AlertService,
  AuthService,
  ClientsService,
  ConfigsService,
  SettingsService,
  SidebarService
} from '@app/core';

import { SharedModule } from '@app/shared';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let rootElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      providers: [
        AlertService,
        AuthService,
        ClientsService,
        ConfigsService,
        SettingsService,
        SidebarService
      ],
      declarations: [AppComponent]
    }).compileComponents();

    const settingsService = TestBed.get(SettingsService);
    spyOn(settingsService, 'fetchSettings').and.stub();

    const clientsService = TestBed.get(ClientsService);
    spyOn(clientsService, 'fetchClients').and.stub();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
