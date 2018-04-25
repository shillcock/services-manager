import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCommandDialogComponent } from './submit-command-dialog.component';

describe('StatusDialogComponent', () => {
  let component: SubmitCommandDialogComponent;
  let fixture: ComponentFixture<SubmitCommandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitCommandDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCommandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
