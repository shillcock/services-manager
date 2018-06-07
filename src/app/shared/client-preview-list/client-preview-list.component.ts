import { Component, Input } from '@angular/core';

import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-client-preview-list',
  templateUrl: './client-preview-list.component.html',
  styleUrls: ['./client-preview-list.component.scss']
})
export class ClientPreviewListComponent {
  @Input() clients: IClient[];
}
