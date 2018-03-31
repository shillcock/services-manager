import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionProcessorComponent } from './action-processor.component';

describe('ActionProcessorComponent', () => {
  let component: ActionProcessorComponent;
  let fixture: ComponentFixture<ActionProcessorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ActionProcessorComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
