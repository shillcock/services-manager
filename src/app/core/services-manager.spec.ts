import { TestBed, inject } from '@angular/core/testing';

import { ServicesManagerService } from './services-manager';

describe('ServicesManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesManagerService]
    });
  });

  it(
    'should be created',
    inject([ServicesManagerService], (service: ServicesManagerService) => {
      expect(service).toBeTruthy();
    })
  );
});
