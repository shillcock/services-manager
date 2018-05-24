import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ErrorMatcher } from './error-matcher';
import { jsonValidator } from './json-validator';

@Component({
  selector: 'sm-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.scss']
})
export class ConfigEditComponent implements OnChanges {
  @Input() config: any;
  @Input() working: boolean;

  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  dirty = false;

  form = new FormGroup({
    json: new FormControl('', jsonValidator)
  });

  matcher = new ErrorMatcher();

  get jsonControl() {
    return this.form.get('json');
  }

  get jsonHasError() {
    if (this.jsonControl) {
      return this.jsonControl.hasError('json');
    }
  }

  get jsonGetError() {
    if (this.jsonControl) {
      return this.jsonControl.getError('json');
    }
  }

  isDirty(): boolean {
    let dirty = false;
    try {
      if (this.dirty) {
        const lhs = JSON.stringify(this.config);
        const rhs = JSON.stringify(JSON.parse(this.jsonControl.value));
        dirty = lhs !== rhs;
      }
    } catch (err) {
      dirty = true;
    }

    return dirty;
  }

  ngOnChanges() {
    const json = JSON.stringify(this.config, null, 2);
    this.form.setValue({ json });
  }

  onKeyPress(event: any) {
    this.dirty = true;

    if (event.key === 'Tab') {
      this.insertTab(event);
    }
  }

  insertTab(event: KeyboardEvent) {
    const TWO_SPACES = '  ';
    event.preventDefault();
    document.execCommand('insertText', true, TWO_SPACES);
  }

  onSubmit() {
    if (this.form.valid) {
      const { json } = this.form.value;
      const updatedConfig = JSON.parse(json);
      this.update.emit(updatedConfig);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
