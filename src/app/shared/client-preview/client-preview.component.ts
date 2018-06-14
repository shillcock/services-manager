import { Component, Input } from '@angular/core';
import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-client-preview',
  templateUrl: './client-preview.component.html',
  styleUrls: ['./client-preview.component.scss']
})
export class ClientPreviewComponent {
  @Input() client: IClient;

  constructor() {
    console.log(this);
  }

  get id() {
    return this.client.id;
  }

  get label() {
    return this.client.label;
  }

  get description() {
    return this.client.description;
  }
}
