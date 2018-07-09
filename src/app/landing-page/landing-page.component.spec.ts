import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule, SharedModule } from '@app/shared';

import { AUTH_SERVICE_ADMIN_STUB_PROVIDER } from '@app/core/stubs/auth-service-stub';
import { ClientsService, CommandService, SidebarService } from '@app/core';

import { LandingPageComponent } from './landing-page.component';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, SharedModule],
      providers: [
        AUTH_SERVICE_ADMIN_STUB_PROVIDER,
        ClientsService,
        CommandService,
        SidebarService
      ],
      declarations: [LandingPageComponent]
    });

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
