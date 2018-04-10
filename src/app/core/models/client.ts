import { Service } from './service';

export interface Client {
  id: string;
  name: string;
  description?: string;
  path: string;
  baseUrl: string;
  services: Service[];
}
