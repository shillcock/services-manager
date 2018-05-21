export interface ISchedule {
  id: string;
  serviceId: string;
  command: string;
  parameters: any;
  cron: string;
  allowOverlap: boolean;
}
