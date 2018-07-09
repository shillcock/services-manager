import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs/observable/of';

import { AUTH_SERVICE_ADMIN_STUB_PROVIDER } from '@app/core/stubs/auth-service-stub';
import { SidebarService } from '@app/core';
import { MaterialModule } from '@app/shared/material.module';

import { AppShellComponent } from './app-shell.component';

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

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [AUTH_SERVICE_ADMIN_STUB_PROVIDER, SidebarService],
      declarations: [AppShellComponent]
    });

    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
