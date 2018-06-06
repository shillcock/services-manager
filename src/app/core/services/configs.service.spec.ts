import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AlertService, SettingsService } from '@app/core';
import { SharedModule } from '@app/shared';

import { ConfigsService } from './configs.service';

describe('ConfigsService', () => {
  let service: ConfigsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [ConfigsService, AlertService, SettingsService]
    });

    service = TestBed.get(ConfigsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
