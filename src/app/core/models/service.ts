export interface IService {
  id: string;
  label: string;
  endpoint?: string;
  postProcessors?: string[];
  renderer?: string;
  default?: boolean;
}
