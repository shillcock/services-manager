import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule, LoggerService } from './core';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryItemComponent } from './history-page/history-item.component';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private logger: LoggerService) {}

  handleError(err: any): void {
    this.logger.captureException(err);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  declarations: [
    AppComponent,
    LandingPageComponent,
    HistoryPageComponent,
    HistoryItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
