import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreviewListComponent } from './client-preview-list.component';

describe('ClientPreviewListComponent', () => {
  let component: ClientPreviewListComponent;
  let fixture: ComponentFixture<ClientPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPreviewListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
