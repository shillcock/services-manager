import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  notify(message: string, action: string = 'Close', config?: any) {
    const defaults: MatSnackBarConfig = {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };

    this.snackBar.open(message, action, { ...defaults, ...config });
  }
}
