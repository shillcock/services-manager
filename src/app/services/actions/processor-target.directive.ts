import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[smProcessorTarget]'
})
export class ProcessorTargetDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
    console.log(this);
  }
}
