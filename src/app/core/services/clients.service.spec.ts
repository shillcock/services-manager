import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { toArray } from 'lodash';

import { API } from '@app/shared/consts';
import { ClientsService, CommandService } from '@app/core';
import { IClient, ICommand } from '@app/core/models';
import { of } from 'rxjs/observable/of';

const mockStatusCommand = {
  proxy: true,
  id: 'status',
  label: 'Status',
  description: 'Get current status of service.',
  endpoint: 'services/status',
  method: 'GET',
  status: true
} as ICommand;

const mockReportingCommand = {
  proxy: false,
  id: 'reporting',
  label: 'Reporting',
  description: 'Get some data.',
  endpoint: 'http://localhost:8000/services/reporting',
  method: 'GET',
  reporting: true
} as ICommand;

const mockClient1 = {
  id: 'client_1',
  label: 'Client 1',
  description: 'Client one description',
  host: 'http://localhost:8000',
  commands: {
    status: mockStatusCommand
  }
} as IClient;

const mockClient2 = {
  id: 'client_2',
  label: 'Client Two',
  description: 'Client two description',
  host: 'http://localhost:8000',
  commands: {
    reporting: mockReportingCommand
  }
} as IClient;

const mockClients = {
  client_1: mockClient1,
  client_2: mockClient2
};

describe('ClientsService', () => {
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

  it('should start and empty array of clients', () => {
    let clients: any = null;

    service.clients$.subscribe(value => {
      clients = value;
    });

    expect(clients).toBeTruthy();
    expect(clients.length).toBe(0);
  });

  describe('#fetchClients', () => {
    it('should fetch all clients', () => {
      let clients: any = null;

      service.clients$.subscribe(value => {
        clients = value;
      });

      expect(clients).toEqual([]);
      expect(clients.length).toBe(0);

      service.fetchClients();

      const req = httpMock.expectOne(API.clients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);

      expect(clients.length).toBeGreaterThan(0);
      expect(clients).toEqual([mockClient1, mockClient2]);
    });

    it('#selectClient should select the correct client', () => {
      let client: any;

      service.selectedClient$.subscribe(value => {
        client = value;
      });

      expect(client).toBe(undefined);

      service.fetchClients();
      const req = httpMock.expectOne(API.clients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);

      service.selectClient('client_1');

      expect(client).toBe(mockClient1);
    });

    it('should list all reporting commands', () => {
      let reportingCommands: any = null;

      service.fetchClients();
      const req = httpMock.expectOne(API.clients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);

      service.reportingCommands$.subscribe(value => {
        reportingCommands = value;
      });

      expect(reportingCommands).toEqual([mockReportingCommand]);
    });
  });

  describe('#getHealth', () => {
    beforeEach(() => {
      service.fetchClients();
      const req = httpMock.expectOne(API.clients);
      expect(req.request.method).toBe('GET');
      req.flush(mockClients);
    });

    it('should call send command since client specifies status command', () => {
      const commandService = TestBed.get(CommandService);
      spyOn(commandService, 'sendCommand').and.returnValue(
        of({ health: 'ok' })
      );

      const health$ = service.getClientHealth(mockClient1);
      expect(health$).toBeTruthy();

      health$.subscribe((health: string | null) => {
        expect(health).toBe('ok');
      });

      expect(commandService.sendCommand).toHaveBeenCalledWith(
        mockStatusCommand
      );
    });

    it('should not call send command since client does not specify status command', () => {
      const commandService = TestBed.get(CommandService);
      spyOn(commandService, 'sendCommand').and.returnValue(
        of({ health: 'ok' })
      );

      service.getClientHealth(mockClient2).subscribe((health: any) => {
        expect(health).toBeFalsy();
      });

      expect(commandService.sendCommand).not.toHaveBeenCalled();
    });
  });
});
