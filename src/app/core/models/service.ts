import { Client } from './client';

export interface Service {
  id: string;
  name: string;
  processors: string[];
  renderer: string;
  default?: boolean;
}

export interface ServiceResponse {
  meta: {
    clientId: string;
    serviceId: string;
    renderer?: string;
    [key: string]: any;
  };
  body: Object;
}

export interface ServiceRenderer {
  context: ServiceResponse;
}
