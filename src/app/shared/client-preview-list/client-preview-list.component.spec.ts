import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClientPreviewListComponent } from './client-preview-list.component';
import { ClientPreviewComponent } from '../client-preview/client-preview.component';
import { MaterialModule } from '@app/shared/material.module';

xdescribe('ClientPreviewListComponent', () => {
  let component: ClientPreviewListComponent;
  let fixture: ComponentFixture<ClientPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [ClientPreviewListComponent, ClientPreviewComponent]
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
