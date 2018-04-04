import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

import {
  DynamicFormComponent,
  FieldConfig
} from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'sm-rpc-detail',
  templateUrl: './rpc-detail.component.html',
  styleUrls: ['./rpc-detail.component.scss']
})
export class RpcDetailComponent implements AfterViewInit {
  @Input() item;

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
