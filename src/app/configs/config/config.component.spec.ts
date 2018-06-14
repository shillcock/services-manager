import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ConfigComponent } from './config.component';
import { ConfigEditComponent } from '../config-edit/config-edit.component';
import { ConfigViewComponent } from '../config-view/config-view.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        AlertService,
        AuthService,
        SettingsService,
        ConfigsService,
        ClientsService,
        SidebarService
      ],
      declarations: [ConfigComponent, ConfigEditComponent, ConfigViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
