export enum API {
  auth = '/gfmui/api/auth',
  clients = '/gfmui/api/clients',
  log = '/gfmui/api/log',
  proxy = '/gfmui/api/proxy',
  settings = '/gfmui/api/settings'
}

export enum ROLES {
  admin = 'admin'
}

export const ACCESS_ADMIN_ONLY = [ROLES.admin];
export const ACCESS_EVERYONE = [];
