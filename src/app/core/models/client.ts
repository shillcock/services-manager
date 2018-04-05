export interface Client {
  id: string;
  name: string;
  description?: string;
  path: string;
  baseUrl: string;
  services: ClientService[];
}

export interface ClientService {
  id: string;
  name: string;
  handlers: string[];
  default?: boolean;
}

export interface ClientServiceResponse {
  meta: any;
  data: any;
}
