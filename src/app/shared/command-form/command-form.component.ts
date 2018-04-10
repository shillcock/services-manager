import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import { DynamicFormComponent, FieldConfig } from '../dynamic-form';

@Component({
  selector: 'sm-command-form',
  templateUrl: './command-form.component.html',
  styleUrls: ['./command-form.component.scss']
})
export class CommandFormComponent implements AfterViewInit {
  @Input() command;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  config: FieldConfig[] = [
    {
      type: 'input',
      name: 'name',
      label: 'Full name'
    },
    {
      type: 'input',
      name: 'age',
      label: 'Age'
    },
    {
      type: 'button',
      name: 'submit',
      label: 'Submit'
    }
  ];

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

    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Scott');
  }
}
