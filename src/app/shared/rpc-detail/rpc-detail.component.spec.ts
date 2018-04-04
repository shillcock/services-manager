import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpcDetailComponent } from './rpc-detail.component';

describe('RpcDetailComponent', () => {
  let component: RpcDetailComponent;
  let fixture: ComponentFixture<RpcDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RpcDetailComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RpcDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
