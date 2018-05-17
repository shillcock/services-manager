import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { DynamicFormModule } from './dynamic-form';

import { AppShellComponent } from './app-shell/app-shell.component';
import { CommandListComponent } from './command-list';
import { LoadingComponent } from './loading.component';
import { JsonComponent } from './json/json.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    JsonComponent
  ],
  declarations: [
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    JsonComponent
  ]
})
export class SharedModule {}
