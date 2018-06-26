import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';

@Component({
  selector: 'sm-report-block',
  templateUrl: './report-block.component.html',
  styleUrls: ['./report-block.component.scss']
})
export class ReportBlockComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @Input() material = true;
  @Input() meta: any;
  @Input() data: any;

  dataSource = new MatTableDataSource();
  columns: any[];
  columnsToDisplay: string[];
  sortedData: any[];

  constructor() {
    console.log(this);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.meta && changes.meta.currentValue) {
      this.meta = changes.meta.currentValue;
      const cols = _.get(this.meta, 'columns');
      this.columns = toArrayWithIds(cols);
      this.columnsToDisplay = _.keys(cols);
    }

    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.dataSource.data = this.data;
      this.sortedData = [...this.data];
    }
  }

  sortData(sort: Sort) {
    const data = [...this.data];
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = _.sortBy(data, [sort.active]);
    if (sort.direction === 'desc') {
      this.sortedData = _.reverse(this.sortedData);
    }
  }
}

function toArrayWithIds(cols: any) {
  return _.reduce(
    cols,
    (accum: any, col: any, key: string) => {
      accum.push({ ...col, id: key });
      return accum;
    },
    []
  );
}
