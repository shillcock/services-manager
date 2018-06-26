import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { DynamicFormModule } from './dynamic-form';

import { AppShellComponent } from './app-shell/app-shell.component';
import { CommandListComponent } from './command-list';
import { LoadingComponent } from './loading.component';

import { CanAccessDirective } from './can-access.directive';
import { JsonComponent } from './json/json.component';
import { ClientPreviewComponent } from './client-preview/client-preview.component';
import { ClientReportComponent } from './client-report/client-report.component';
import { ReportBlockComponent } from './report-block/report-block.component';

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
    CanAccessDirective,
    ClientPreviewComponent,
    ClientReportComponent,
    ReportBlockComponent
  ],
  declarations: [
    AppShellComponent,
    CommandListComponent,
    LoadingComponent,
    JsonComponent,
    CanAccessDirective,
    ClientPreviewComponent,
    ClientReportComponent,
    ReportBlockComponent
  ]
})
export class SharedModule {}
