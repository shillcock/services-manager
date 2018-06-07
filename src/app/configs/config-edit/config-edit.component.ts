import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { FormControl } from '@angular/forms';

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
  @Input() canSave = true;

  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  dirty = false;
  saving = false;
  matcher = new ErrorMatcher();
  jsonEditor = new FormControl('', jsonValidator);

  get editorHasError() {
    return this.jsonEditor.hasError('json');
  }

  get editorGetError() {
    return this.jsonEditor.getError('json');
  }

  get disableSave() {
    return !this.canSave || this.jsonEditor.invalid || this.working;
  }

  isDirty(): boolean {
    let dirty = false;
    try {
      if (this.dirty) {
        const lhs = JSON.stringify(this.config);
        const newConfig = JSON.parse(this.jsonEditor.value);
        const rhs = JSON.stringify(newConfig);
        dirty = lhs !== rhs;
      }
    } catch (err) {
      dirty = true;
    }

    return dirty;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.working) {
      changes.working.currentValue
        ? this.jsonEditor.disable()
        : this.jsonEditor.enable();
    }

    if (changes.config) {
      const json = JSON.stringify(this.config, null, 2);
      this.jsonEditor.setValue(json);
      this.dirty = false;
    }

    this.saving = false;
  }

  onKeyPress(event: KeyboardEvent) {
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
    this.saving = true;
    if (this.jsonEditor.valid) {
      const updatedConfig = JSON.parse(this.jsonEditor.value);
      this.update.emit(updatedConfig);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
