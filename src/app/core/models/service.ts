import { Action } from '@app/core/models/action';

export interface Service {
  id: string;
  name: string;
  description?: string;
  path: string;
  baseUrl: string;
  actions: Action[];
}
