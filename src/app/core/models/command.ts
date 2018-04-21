export interface ICommandParameter {
  id: string;
  name: string;
  description?: string;
  defaultValue?: string;
  tooltip?: string;
  required?: boolean;
}

export interface ICommand {
  id: string;
  label: string;
  description?: string;
  endpoint: string;
  method: 'GET' | 'POST';
  parameters: ICommandParameter[];
  data: any;
}
