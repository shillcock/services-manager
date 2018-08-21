import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ],
  exports: [DynamicFormComponent],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ]
})
export class DynamicFormModule {}
