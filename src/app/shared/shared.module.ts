import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { DynamicFormModule } from './dynamic-form';

import { AppShellComponent } from './app-shell/app-shell.component';
import { CommandListComponent } from './command-list';
import { LoadingComponent } from './loading.component';

import { JsonComponent } from './json/json.component';
import { ClientPreviewListComponent } from './client-preview-list/client-preview-list.component';
import { ClientPreviewComponent } from './client-preview/client-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    DynamicFormModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    DynamicFormModule,
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    JsonComponent,
    ClientPreviewListComponent,
    ClientPreviewComponent
  ],
  declarations: [
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    JsonComponent,
    ClientPreviewListComponent,
    ClientPreviewComponent
  ]
})
export class SharedModule {}
