import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule, SharedModule } from '@app/shared';

import { ClientsService, CommandService, SidebarService } from '@app/core';
import { AUTH_SERVICE_ADMIN_STUB_PROVIDER } from '@app/core/stubs/auth-service-stub';

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, SharedModule],
      declarations: [ReportsComponent],
      providers: [
        AUTH_SERVICE_ADMIN_STUB_PROVIDER,
        ClientsService,
        CommandService,
        SidebarService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
