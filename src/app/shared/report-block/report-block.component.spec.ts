import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBlockComponent } from './report-block.component';
import { MaterialModule } from '@app/shared';

describe('ReportBlockComponent', () => {
  let component: ReportBlockComponent;
  let fixture: ComponentFixture<ReportBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ReportBlockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
