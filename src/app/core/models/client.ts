import { IService } from './service';

export interface IClient {
  id: string;
  name: string;
  description?: string;
  path: string;
  baseUrl: string;
  services?: IService[];
}
