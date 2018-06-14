import { of } from 'rxjs/observable/of';
import { AuthService } from '@app/core';

export const userAdminStub = {
  name: 'Mock Admin',
  edi: '1234567890',
  roles: ['admin']
};

export const userOperatorStub = {
  name: 'Mock Operator',
  edi: '1234567890',
  roles: ['operator']
};

const canAccess = (user: any) => (roles: string[]) => {
  if (_.isEmpty(roles)) {
    return true;
  }

  const inRoles = _.curry(_.includes)(roles);
  const userRoles = _.get(user, 'roles', []);
  return _.some(userRoles, inRoles);
};

export const authServiceAdminStub = {
  user$: of(userAdminStub),
  canAccess: canAccess(userAdminStub)
};

export const authServiceOperatorStub = {
  user$: of(userOperatorStub),
  canAccess: canAccess(userOperatorStub)
};

export const AUTH_SERVICE_ADMIN_STUB_PROVIDER = {
  provide: AuthService,
  useValue: authServiceAdminStub
};

export const AUTH_SERVICE_USER_STUB_PROVIDER = {
  provide: AuthService,
  useValue: authServiceOperatorStub
};
