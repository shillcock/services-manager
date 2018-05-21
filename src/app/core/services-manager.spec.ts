import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { IClientsMap, ServicesManager } from './services-manager';
import { API } from '@app/shared/consts';
import { IClient, ICommand } from '@app/core/models';

describe('ServicesManagerService', () => {
  let service: ServicesManager;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesManager]
    });

    service = TestBed.get(ServicesManager);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockCommand1 = {
    id: 'status',
    label: 'Status',
    description: 'Get current status of service.',
    endpoint: 'services/status',
    method: 'GET'
  } as ICommand;

  const mockCommand2 = {
    ...mockCommand1,
    endpoint: 'http://localhost:9999/services/status'
  };

  const mockClient1 = {
    id: 'client1',
    label: 'Client 1',
    description: 'Client Description',
    host: 'http://localhost:8000',
    commands: { status: mockCommand1 }
  } as IClient;

  const mockClient2 = {
    id: 'client2',
    label: 'Client 2',
    description: 'Client Description',
    host: 'http://localhost:8000',
    commands: { status: mockCommand2 }
  } as IClient;

  const mockClients = {
    client1: mockClient1,
    client2: mockClient2
  } as IClientsMap;

  it('should be created', () => {
    expect(service).toBeTruthy();
    httpMock.expectOne(API.getClients);
  });

  describe('.clients$', () => {
    it('should expose clients in observable', () => {
      service.clients$.subscribe(next => {
        expect(Object.keys(next).length).toBe(2);
        expect(next.client1).toEqual(mockClients.client1);
        expect(next.client2).toEqual(mockClients.client2);
      });

      const req = httpMock.expectOne(API.getClients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);
    });

    it('should cache and return last results', () => {
      const req = httpMock.expectOne(API.getClients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);

      service.clients$.subscribe(next => {
        expect(Object.keys(next).length).toBe(2);
      });

      service.clients$.subscribe(next => {
        expect(Object.keys(next).length).toBe(2);
      });

      httpMock.expectNone(API.getClients);
    });
  });

  describe('#fetchClients', () => {
    it('should refresh clients from server', () => {
      const req = httpMock.expectOne(API.getClients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);

      service.clients$.subscribe(next => {
        expect(Object.keys(next).length).toBe(2);
      });

      service.fetchClients();
      httpMock.expectOne(API.getClients).flush({ client1: mockClient1 });

      service.clients$.subscribe(next => {
        expect(Object.keys(next).length).toBe(1);
      });
    });
  });

  describe('#getClient', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(API.getClients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);
    });

    it('should return correct client for given id', () => {
      service.getClient(mockClient1.id).subscribe(next => {
        expect(next).toBeTruthy();
        expect(next).toEqual(mockClient1);
      });
    });

    it('should return undefined when client id is invalid', () => {
      service.getClient('doesNotExists').subscribe(next => {
        expect(next).toBeFalsy();
      });
    });

    it('should return commands with endpoint that includes client host', () => {
      service.getClient(mockClient1.id).subscribe(next => {
        expect(next).toBeTruthy();

        if (next) {
          const command = next.commands.status;
          expect(command.id).toBe(mockCommand1.id);

          const fullEndpoint = mockClient1.host + '/' + mockCommand1.endpoint;
          expect(command.endpoint).not.toEqual(mockCommand1.endpoint);
          expect(command.endpoint).toEqual(fullEndpoint);
        }
      });
    });

    it('should return commands original endpoint since it starts with http', () => {
      service.getClient(mockClient2.id).subscribe(next => {
        expect(next).toBeTruthy();

        if (next) {
          const command = next.commands.status;
          expect(command.id).toBe(mockCommand2.id);

          const fullEndpoint = mockClient2.host + '/' + mockCommand2.endpoint;
          expect(command.endpoint).toEqual(mockCommand2.endpoint);
          expect(command.endpoint).not.toEqual(fullEndpoint);
        }
      });
    });
  });
});
