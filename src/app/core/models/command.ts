export interface CommandArgument {
  id: string;
  name: string;
  description?: string;
  defaultValue?: string;
  tooltip?: string;
  required?: boolean;
}

export interface Command {
  id: string;
  label: string;
  endpoint: string;
  method: 'GET' | 'POST';
  arguments: CommandArgument[];
  data: any;
}

export interface CommandHandler {
  data: any;
}
