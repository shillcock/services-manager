import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata
} from '@angular/core/testing';

import { AUTH_SERVICE_ADMIN_STUB_PROVIDER } from '@app/core/stubs/admin-service-stub';

import { CanAccessDirective } from './can-access.directive';

@Component({
  template: `
    <button [smCanAccess]="['admin']">Save</button>
    `
})
class TestComponent {}

describe('CanAccessDirective', () => {
  let fixture: ComponentFixture<any> | null;
  let directive: CanAccessDirective;

  beforeEach(() => {
    const testModuleMetadata: TestModuleMetadata = {
      providers: [AUTH_SERVICE_ADMIN_STUB_PROVIDER],
      declarations: [CanAccessDirective, TestComponent]
    };
    fixture = TestBed.configureTestingModule(
      testModuleMetadata
    ).createComponent(TestComponent);

    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = null;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
