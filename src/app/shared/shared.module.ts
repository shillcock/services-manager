import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { DynamicFieldDirective } from './dynamic-form/dynamic-field/dynamic-field.directive';
import { FormInputComponent } from './dynamic-form/form-input/form-input.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './dynamic-form/form-button/form-button.component';

import { RpcListComponent } from './rpc-list/rpc-list.component';
import { RpcDetailComponent } from './rpc-detail/rpc-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DynamicFormComponent,
    RpcListComponent,
    RpcDetailComponent
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    RpcListComponent,
    RpcDetailComponent
  ],
  entryComponents: [FormButtonComponent, FormInputComponent]
})
export class SharedModule {}
