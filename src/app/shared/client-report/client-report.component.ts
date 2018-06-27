import { Component, Input } from '@angular/core';

interface IClientReportColumn {
  name: string;
  label: string;
  dataType: string;
}

interface IClientReportRow {
  [column: string]: any;
}

interface IClientReport {
  columns: IClientReportColumn[];
  data: IClientReportRow[];
}

@Component({
  selector: 'sm-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss']
})
export class ClientReportComponent {
  @Input() report: IClientReport;

  constructor() {}

  get blocks() {
    return _.get(this.report, 'blocks');
  }

  get hasBlocks() {
    return !_.isEmpty(this.blocks);
  }

  get material() {
    return _.get(this.report, ['meta', 'material'], true);
  }
}
