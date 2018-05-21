import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs/observable/of';

import { AuthService, ServicesManager, SidebarService } from '@app/core';
import { MaterialModule } from '@app/shared/material.module';

import { AppComponent } from './app.component';

const authState = {
  user: {
    edi: '1234567890',
    name: 'Scott',
    roles: ['admin']
  }
};

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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  // let authService: AuthService;
  // let sm: ServicesManager;
  let rootElement: DebugElement;

  const authServiceStub = {
    authorized$: of(true),
    user$: of(authState.user)
  };

  const servicesManagerStub = {
    clients$: of(smState.clients)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, MaterialModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: ServicesManager, useValue: servicesManagerStub },
        SidebarService
      ],
      declarations: [AppComponent]
    }).compileComponents();

    // authService = TestBed.get(AuthService);
    // sm = TestBed.get(ServicesManager);
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
