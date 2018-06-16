import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { LoggerService } from './services/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const logger = this.injector.get(LoggerService);
    logger.captureException(error);
    throw error;
  }
}

export const GLOBAL_ERROR_HANDLER_PROVIDER = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler
};
