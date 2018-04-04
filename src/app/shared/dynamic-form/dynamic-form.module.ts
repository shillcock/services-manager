import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent
  ],
  exports: [DynamicFormComponent],
  entryComponents: [FormButtonComponent, FormInputComponent]
})
export class DynamicFormModule {}
