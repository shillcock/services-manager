export interface ICommand {
  id: string;
  label: string;
  description?: string;
  endpoint: string;
  method: 'GET' | 'POST';
  parameters: [
    {
      id: string;
      label: string;
      description?: string;
      defaultValue?: string | number;
      required?: boolean;
    }
  ];
  data: any;
}
