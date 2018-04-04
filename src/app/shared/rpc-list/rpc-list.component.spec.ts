import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpcListComponent } from './rpc-list.component';

describe('RpcListComponent', () => {
  let component: RpcListComponent;
  let fixture: ComponentFixture<RpcListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RpcListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RpcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
