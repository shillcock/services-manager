import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { ServiceRenderer, ServiceResponse } from '@app/core/models';
import { getRenderer } from '../renderers';

@Component({
  selector: 'sm-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() context: ServiceResponse;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.context && changes.context.currentValue) {
      this.context = changes.context.currentValue;
      this.loadProcessor();
    }
  }

  ngOnDestroy(): void {
    if (this.container) {
      this.container.clear();
    }
  }

  private loadProcessor() {
    if (!this.context) {
      // || !this.container) {
      return;
    }

    const { meta } = this.context;

    const componentFactory = this.resolver.resolveComponentFactory(
      getRenderer(meta.renderer)
    );

    this.container.clear();
    const componentRef = this.container.createComponent(componentFactory);
    (componentRef.instance as ServiceRenderer).context = this.context;
  }
}
