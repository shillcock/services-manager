import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { ICommand } from '@app/core/models';
import { DynamicFormComponent } from '../dynamic-form';

@Component({
  selector: 'sm-command-form',
  templateUrl: './command-form.component.html',
  styleUrls: ['./command-form.component.scss']
})
export class CommandFormComponent implements AfterViewInit {
  @Input() command: ICommand;

  @Output() submit = new EventEmitter();

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  get parameters() {
    const { parameters } = this.command;
    return parameters;
  }

  constructor() {
    console.log(this);
  }

  ngAfterViewInit() {
    /*
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    */
  }
}
