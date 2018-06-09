import { Component, OnDestroy } from '@angular/core';

import { LoggerService } from '@app/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnDestroy {
  private destroyed$ = new Subject<boolean>();
  logs: any[];

  constructor(private logger: LoggerService) {
    logger.logs$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(logs => (this.logs = logs));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
