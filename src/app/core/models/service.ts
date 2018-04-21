export interface IService {
  id: string;
  name: string;
  processors?: string[];
  renderer?: string;
  default?: boolean;
}
