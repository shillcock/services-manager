export interface Service {
  id: string;
  name: string;
  description?: string;
  path: string;
  baseUrl: string;
  actions: ServiceAction[];
}

export interface ServiceAction {
  type: string;
  label: string;
  default?: boolean;
  processor?: string;
}
