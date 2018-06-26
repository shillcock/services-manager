import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sm-report-block',
  templateUrl: './report-block.component.html',
  styleUrls: ['./report-block.component.scss']
})
export class ReportBlockComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @Input() meta: any;
  @Input() data: any;

  dataSource = new MatTableDataSource();
  columns: any[];
  columnsToDisplay: string[];

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.meta && changes.meta.currentValue) {
      this.meta = changes.meta.currentValue;
      this.columns = _.toArray(this.meta);
      this.columnsToDisplay = _.keys(this.meta);
    }

    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.dataSource.data = this.data;
    }
  }
}
