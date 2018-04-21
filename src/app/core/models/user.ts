export interface IUser {
  edi: string;
  name: string;
  roles: string[] | undefined;
  authenticated: boolean;
}

export function isUser(arg: any): arg is IUser {
  return arg.edi !== undefined && arg.name !== undefined;
}
