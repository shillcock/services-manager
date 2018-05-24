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

export const ConfigItems = [
  { label: 'Clients', path: 'clients' },
  { label: 'Roles', path: 'roles' },
  { label: 'Schedules', path: 'schedules' },
  { label: 'Settings', path: 'settings' }
];
