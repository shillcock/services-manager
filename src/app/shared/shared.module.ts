import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import {
  DynamicFieldDirective,
  FormInputComponent,
  DynamicFormComponent,
  FormButtonComponent
} from './dynamic-form';

import { CommandListComponent } from './command-list';
import { CommandFormComponent } from './command-form';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DynamicFormComponent,
    CommandListComponent,
    CommandFormComponent,
    LoadingComponent
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    CommandListComponent,
    CommandFormComponent,
    LoadingComponent
  ],
  entryComponents: [FormButtonComponent, FormInputComponent]
})
export class SharedModule {}
