import { ICommand } from './command';
import { IService } from './service';

export interface IClient {
  id: string;
  label: string;
  description?: string;
  path: string;
  host: string;
  services?: IService[];
  commands?: ICommand[];
}
