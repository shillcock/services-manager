import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sm-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./config-view.component.scss']
})
export class ConfigViewComponent {
  @Input() config: any;
  @Input() canEdit = true;

  @Output() edit = new EventEmitter<boolean>();

  onEdit() {
    this.edit.emit(true);
  }
}
