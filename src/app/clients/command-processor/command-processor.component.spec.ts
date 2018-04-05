import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandProcessorComponent } from './command-processor.component';

describe('CommandProcessorComponent', () => {
  let component: CommandProcessorComponent;
  let fixture: ComponentFixture<CommandProcessorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CommandProcessorComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
