import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { get } from 'lodash';

import { ICommand } from '@app/core/models';
import { DynamicFormComponent } from '../dynamic-form';

@Component({
  selector: 'sm-command-form',
  templateUrl: './command-form.component.html',
  styleUrls: ['./command-form.component.scss']
})
export class CommandFormComponent implements AfterViewInit {
  @Input() command: ICommand;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  get config() {
    return get(this.command, 'parameters');
  }

  constructor() {
    console.log(this);
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
  }
}
