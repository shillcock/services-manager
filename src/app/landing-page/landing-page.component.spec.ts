import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/observable/of';

import { MaterialModule } from '@app/shared/material.module';
import { LoadingComponent } from '@app/shared/loading.component';
import { AppShellComponent } from '@app/shared/app-shell/app-shell.component';

import { ServicesManager, SidebarService } from '@app/core';

import { LandingPageComponent } from './landing-page.component';
import { By } from '@angular/platform-browser';

const smState = {
  clients: {
    em4tm: {
      id: 'em4tm',
      label: 'EM4TM',
      description: 'EM4 Topic Manager',
      host: 'http://localhost:8000',
      commands: {
        status: {
          id: 'status',
          label: 'Status',
          description: 'Get current status of service.',
          endpoint: 'services/status',
          method: 'GET'
        },
        start: {
          id: 'start',
          label: 'Start Service',
          description: 'Starts the service.',
          endpoint: 'services/echo',
          method: 'POST',
          parameters: [
            {
              id: 'secondsFromNow',
              type: 'input',
              label: 'Seconds from now',
              description:
                'The number of seconds from the call that the service will start.',
              default: '0',
              tooltip: '600 seconds is 10 minutes',
              required: false
            }
          ]
        }
      }
    }
  }
};

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let sm: ServicesManager;

  const servicesManagerStub = {
    clients$: of(smState.clients)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      providers: [
        { provide: ServicesManager, useValue: servicesManagerStub },
        SidebarService
      ],
      declarations: [LandingPageComponent, LoadingComponent, AppShellComponent]
    });

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;

    sm = TestBed.get(ServicesManager);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display each client', () => {});
});
