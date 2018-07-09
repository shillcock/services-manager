import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import {
  AlertService,
  ClientsService,
  ConfigsService,
  CommandService,
  SettingsService,
  SidebarService
} from '@app/core';

import { AUTH_SERVICE_ADMIN_STUB_PROVIDER } from '@app/core/stubs/auth-service-stub';

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
        AUTH_SERVICE_ADMIN_STUB_PROVIDER,
        ClientsService,
        ConfigsService,
        CommandService,
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
