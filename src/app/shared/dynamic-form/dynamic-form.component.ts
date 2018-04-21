import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  id: string;
  disabled?: boolean;
  label?: string;
  options?: string[];
  type: string;
  validation?: ValidatorFn[];
  value?: any;
}

export interface Field {
  config: FieldConfig;
  group: FormGroup;
}

@Component({
  selector: 'sm-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() config: FieldConfig[] = [];

  @Output() submit = new EventEmitter();

  form: FormGroup;

  get controls() {
    return this.config
      ? this.config.filter(({ type }) => type !== 'button')
      : [];
  }

  get changes() {
    return this.form.valueChanges;
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      console.log('controls:', this.controls);
      const configControls = this.controls.map(item => item.id);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(id => {
          const config = this.config.find(control => control.id === id);
          if (config) {
            this.form.addControl(id, this.createControl(config));
          }
        });
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control =>
      group.addControl(control.id, this.createControl(control))
    );
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('SUBMIT:', this.value);
    this.submit.emit(this.value);
  }

  setDisabled(id: string, disable: boolean) {
    if (this.form.controls[id]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[id][method]();
      return;
    }

    this.config = this.config.map(item => {
      if (item.id === id) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(id: string, value: any) {
    if (this.form.controls[id]) {
      this.form.controls[id].setValue(value, { emitEvent: true });
    }
  }
}
