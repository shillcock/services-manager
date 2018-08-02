export interface ICommand {
  id: string;
  label: string;
  description?: string;
  endpoint: string;
  method: 'GET' | 'POST';
  proxy: boolean;
  parameters?: [
    {
      id: string;
      label: string;
      description?: string;
      defaultValue?: string | number;
      required?: boolean;
    }
  ];
  extra?: {
    [key: string]: any;
  };
  roles?: string[];
}
