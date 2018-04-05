import { TestBed, inject } from '@angular/core/testing';

import { ServicesManager } from './services-manager';

describe('ServicesManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesManager]
    });
  });

  it(
    'should be created',
    inject([ServicesManager], (service: ServicesManager) => {
      expect(service).toBeTruthy();
    })
  );
});
