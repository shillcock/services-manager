import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [AlertService]
    });

    service = TestBed.get(AlertService);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackbar open', () => {
    spyOn(snackBar, 'open');
    service.notify('some message');
    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });
});
