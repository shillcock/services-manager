import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, FieldConfig } from '../dynamic-form.component';

@Component({
  selector: 'sm-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  constructor() {
    console.log(this);
  }

  get value() {
    return this.config.value || '';
  }
}
