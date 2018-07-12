import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { toArray } from 'lodash';

import { API } from '@app/shared/consts';
import { ClientsService, CommandService } from '@app/core';
import { IClient } from '@app/core/models';

const mockClients = {
  client_1: {
    id: 'client_1',
    label: 'Client 1',
    description: 'Client one description',
    host: 'http://localhost:8000',
    commands: [
      {
        id: 'status',
        label: 'Status',
        description: 'Get current status of service.',
        endpoint: 'services/status',
        method: 'GET',
        status: true
      }
    ]
  },
  client_2: {
    id: 'client_2',
    label: 'Client Two',
    description: 'Client two description',
    host: 'http://localhost:8000',
    commands: [
      {
        id: 'status',
        label: 'Status',
        description: 'Get current status of service.',
        endpoint: 'services/status',
        method: 'GET',
        status: true
      }
    ]
  }
};

const mockClientsAsArray = toArray(mockClients);

fdescribe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsService, CommandService]
    });

    service = TestBed.get(ClientsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#fetchClients should fetch all clients', () => {
    let clients: any = null;

    service.clients$.subscribe(value => {
      clients = value;
    });

    expect(clients).toBeTruthy();
    expect(clients.length).toBe(0);

    service.fetchClients();

    const req = httpMock.expectOne(API.clients);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);

    expect(clients.length).toBeGreaterThan(0);
    expect(clients).toEqual(mockClientsAsArray);
  });

  it('#selectClient should select the correct client', () => {
    let client: any = null;

    service.selectedClient$.subscribe(value => {
      client = value;
    });

    expect(client).toBeFalsy();

    service.fetchClients();
    const req = httpMock.expectOne(API.clients);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients);

    service.selectClient('client_1');

    expect(client).toBe(mockClients.client_1);
  });
});
