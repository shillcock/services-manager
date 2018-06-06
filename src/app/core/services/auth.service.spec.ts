import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { API } from '@app/shared/consts';
import { AuthService } from '@app/core';
import { IUser } from '@app/core/models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and fetch auth state', () => {
    const mockUser = {
      edi: '1234567890',
      name: 'Bob',
      roles: ['admin']
    } as IUser;

    let currentUser: IUser | undefined;
    let userAuthorized = false;

    expect(service).toBeTruthy();

    service.user$.subscribe(user => {
      currentUser = user;
    });

    service.authorized$.subscribe(value => {
      userAuthorized = value;
    });

    const req = httpMock.expectOne(API.auth);
    expect(req.request.method).toBe('GET');
    req.flush({ user: mockUser });

    expect(currentUser).toBeTruthy();
    expect(currentUser).toEqual(mockUser);

    expect(userAuthorized).toBeTruthy();
  });
});
