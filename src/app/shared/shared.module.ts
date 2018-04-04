import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

import { RpcListComponent } from './rpc-list/rpc-list.component';
import { RpcDetailComponent } from './rpc-detail/rpc-detail.component';
import { MaterialModule } from '@app/shared/material.module';

import { DynamicFieldDirective } from '@app/shared/dynamic-form/dynamic-field/dynamic-field.directive';
import { FormInputComponent } from '@app/shared/dynamic-form/form-input/form-input.component';
import { DynamicFormComponent } from '@app/shared/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from '@app/shared/dynamic-form/form-button/form-button.component';

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
