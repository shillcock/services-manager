import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '@env/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { ClientsModule } from './clients/clients.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduleEditDialog } from './schedules/schedule-edit-dialog.component';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    const error = err.originalError || err;
    const message = error.message || error.toString();

    // TODO: Send errors to backend for logging
    // logger.captureException(error);

    if (!environment.production) {
      console.group('AppError');
      console.error(window.location.pathname);
      console.error(message);
      console.error(error.stack);
      console.error(window.navigator.userAgent);
      console.groupEnd();
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ClientsModule
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  declarations: [AppComponent, LandingPageComponent, SchedulesComponent, ScheduleEditDialog],
  entryComponents: [ScheduleEditDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
