import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { API } from '@app/shared/consts';
import { CommandService } from '@app/core';
import { ICommand } from '@app/core/models';

describe('CommandService', () => {
  let service: CommandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommandService]
    });

    service = TestBed.get(CommandService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send command through proxy', () => {
    const clientId = 'dummyClient';
    const commandId = 'dummyCommand';

    const mockCommand = {
      id: commandId,
      endpoint: 'http://localhost:8000/services/status',
      method: 'GET',
      proxy: true
    } as ICommand;

    const mockPayload = { foo: 'bar' };
    const mockMeta = { clientId };
    const mockStatus = {
      meta: { clientId, commandId },
      status: 'ok'
    };

    service
      .sendCommand(mockCommand, mockPayload, mockMeta)
      .subscribe(results => {
        expect(results.status).toBe('ok');
        expect(results.meta).toEqual(mockStatus.meta);
      });

    const req = httpMock.expectOne(API.proxy);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      method: mockCommand.method,
      url: mockCommand.endpoint,
      payload: mockPayload
    });

    req.flush(mockStatus);
  });

  it('should send command directly', () => {
    const clientId = 'dummyClient';
    const commandId = 'dummyCommand';

    const mockCommand = {
      id: commandId,
      endpoint: 'http://localhost:8000/services/status',
      method: 'GET',
      proxy: false
    } as ICommand;

    const mockMeta = { clientId };
    const mockStatus = {
      meta: { clientId, commandId },
      status: 'ok'
    };

    service.sendCommand(mockCommand, {}, mockMeta).subscribe(results => {
      expect(results.status).toBe('ok');
      expect(results.meta).toEqual(mockStatus.meta);
    });

    const req = httpMock.expectOne(mockCommand.endpoint);
    expect(req.request.method).toBe(mockCommand.method);

    req.flush(mockStatus);
  });
});
