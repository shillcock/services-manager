import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldDirective } from './dynamic-field.directive';

describe('DynamicFieldDirective', () => {
  let component: DynamicFieldDirective;
  let fixture: ComponentFixture<DynamicFieldDirective>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DynamicFieldDirective]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
