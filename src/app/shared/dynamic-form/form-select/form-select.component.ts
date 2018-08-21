import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, FieldConfig } from '../dynamic-form.component';

@Component({
  selector: 'sm-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  constructor() {}
}
