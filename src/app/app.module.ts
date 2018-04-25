import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  Injectable
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '@env/environment';

import { AppRoutingModule } from './app-routing.module';
import { AuthService, CoreModule } from './core';
import { SharedModule } from './shared';
import { ClientsModule } from './clients/clients.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

function initApp(authService: AuthService) {
  return () => authService.initializeApp();
}

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

export function provideErrorHandler() {
  // return environment.production ? new AppErrorHandler() : new ErrorHandler();
  return new AppErrorHandler();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ClientsModule
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: ErrorHandler, useFactory: provideErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService],
      multi: true
    }
  ],
  declarations: [AppComponent, LandingPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
