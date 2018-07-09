import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportComponent } from './client-report.component';
import { ReportBlockComponent } from '../report-block/report-block.component';

import { MaterialModule } from '@app/shared';

describe('ClientReportComponent', () => {
  let component: ClientReportComponent;
  let fixture: ComponentFixture<ClientReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ClientReportComponent, ReportBlockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
