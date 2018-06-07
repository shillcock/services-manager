export enum API {
  auth = '/gfmui/api/auth',
  clients = '/gfmui/api/clients',
  proxy = '/gfmui/api/proxy',
  roles = '/gfmui/api/roles',
  schedules = '/gfmui/api/schedules',
  settings = '/gfmui/api/settings'
}

export enum MODIFY_ACTIONS {
  add = 'ADD',
  edit = 'EDIT',
  delete = 'DELETE'
}

export enum ROLES {
  admin = 'admin'
}

export const ACCESS_ADMIN_ONLY = [ROLES.admin];
export const ACCESS_EVERYONE = [];
