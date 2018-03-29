import { TestBed, inject } from '@angular/core/testing';

import { MODEL_PROVIDER, ModelFactory } from './model.service';
import { AuthService } from './auth.service';

interface TestModel {
  value: string;
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, MODEL_PROVIDER]
    });
  });

  it(
    'should be created',
    inject(
      [AuthService, ModelFactory],
      (service: AuthService, modelFactory: ModelFactory<TestModel>) => {
        expect(service).toBeTruthy();
      }
    )
  );
});
