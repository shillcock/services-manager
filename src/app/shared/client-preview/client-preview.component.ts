import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IClient } from '@app/core/models';

@Component({
  selector: 'sm-client-preview',
  templateUrl: './client-preview.component.html',
  styleUrls: ['./client-preview.component.scss']
})
export class ClientPreviewComponent {
  @Input() client: IClient;
  @Input() health: string;

  @Output() healthClick = new EventEmitter();

  get id() {
    return _.get(this.client, 'id');
  }

  get label() {
    return _.get(this.client, 'label');
  }

  get description() {
    return _.get(this.client, 'description');
  }

  get hasHealth() {
    return !_.isEmpty(this.health);
  }

  get isHealthy() {
    return _.isEmpty(this.health) || this.health === 'ok';
  }

  get healthClass() {
    if (this.hasHealth) {
      return this.isHealthy ? 'healthOk' : 'healthNotOk';
    }
  }

  get healthIcon() {
    return this.isHealthy ? 'checkmark-outline' : 'exclamation-solid';
  }

  get healthColor() {
    return this.isHealthy ? 'primary' : 'warn';
  }

  get healthTooltip() {
    return `Status: ${this.health.toLocaleUpperCase()}`;
  }

  onHealthClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.healthClick.emit(this.client.id);
  }
}
