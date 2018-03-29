import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { map, takeUntil } from 'rxjs/operators';

import { ServicesManager } from '@app/core';
import { Service } from '@app/core/models';

@Component({
  selector: 'sm-service-action',
  templateUrl: './service-action.component.html',
  styleUrls: ['./service-action.component.scss']
})
export class ServiceActionComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  actionType: string;
  service: Service;

  constructor(private route: ActivatedRoute, private sm: ServicesManager) {
    route.parent.data
      .pipe(map(data => data.service), takeUntil(this.destroy$))
      .subscribe(service => (this.service = service));

    route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.actionType = params['actionType'];
      console.log('ACTION_TYPE:', this.actionType);
    });

    console.log(this);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
