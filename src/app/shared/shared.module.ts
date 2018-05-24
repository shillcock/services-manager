import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { DynamicFormModule } from './dynamic-form';

import { AppShellComponent } from './app-shell/app-shell.component';
import { CommandListComponent } from './command-list';
import { LoadingComponent } from './loading.component';

import { ContenteditableModel } from './contenteditable-model.directive';
import { JsonComponent } from '@app/shared/json/json.component';

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
    DynamicFormModule,
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    ContenteditableModel,
    JsonComponent
  ],
  declarations: [
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    ContenteditableModel,
    JsonComponent
  ]
})
export class SharedModule {}
