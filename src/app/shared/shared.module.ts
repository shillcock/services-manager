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

import { AppShellComponent } from './app-shell/app-shell.component';
import { CommandListComponent } from './command-list';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DynamicFormComponent,
    AppShellComponent,
    CommandListComponent,
    LoadingComponent
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    AppShellComponent,
    CommandListComponent,
    LoadingComponent
  ],
  entryComponents: [FormButtonComponent, FormInputComponent]
})
export class SharedModule {}
