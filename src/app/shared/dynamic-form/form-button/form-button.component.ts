import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, FieldConfig } from '../dynamic-form.component';

@Component({
  selector: 'sm-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  constructor() {
    console.log(this);
  }
}
