import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { AuthService } from '@app/core';

@Directive({
  selector: '[smCanAccess]'
})
export class CanAccessDirective implements AfterViewInit {
  @Input() smCanAccess: string[];
  constructor(private el: ElementRef, private auth: AuthService) {}

  ngAfterViewInit() {
    this.el.nativeElement.disabled = !this.auth.canAccess(this.smCanAccess);
  }
}
