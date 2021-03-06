import { ICommand } from './command';

export interface IClient {
  id: string;
  label: string;
  description?: string;
  host: string;
  proxy?: boolean;
  commands: {
    [id: string]: ICommand;
  };
}

export interface IClientsMap {
  [id: string]: IClient;
}
