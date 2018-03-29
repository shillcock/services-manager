import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { map, takeUntil } from 'rxjs/operators';

import { Service } from '@app/core';

@Component({
  selector: 'sm-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  service: Service;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(map(data => data['service']), takeUntil(this.destroy$))
      .subscribe(service => (this.service = service));
    console.log(this);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
