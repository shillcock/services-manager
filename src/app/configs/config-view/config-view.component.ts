import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConfigComponent } from '@app/configs/config/config.component';

@Component({
  selector: 'sm-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.scss']
})
export class ConfigViewComponent {
  @Input() config: any;

  @Output() edit = new EventEmitter<boolean>();

  onEdit() {
    this.edit.emit(true);
  }
}
