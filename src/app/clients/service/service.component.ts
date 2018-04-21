import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { get } from 'lodash';

import { getRenderer } from '../renderers';

@Component({
  selector: 'sm-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnChanges, OnDestroy {
  @Input() context: any;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.context && changes.context.currentValue) {
      this.context = changes.context.currentValue;
    }

    this.loadRenderer();
  }

  ngOnDestroy(): void {
    if (this.container) {
      this.container.clear();
    }
  }

  private loadRenderer() {
    if (!this.context) {
      return;
    }

    const componentFactory = this.resolver.resolveComponentFactory(
      this.getRenderer(this.context)
    );

    this.container.clear();
    const componentRef = this.container.createComponent(componentFactory);
    (componentRef.instance as any).context = this.context;
  }

  private getRenderer({ status, meta }: { status: string; meta?: any }) {
    const renderer = status === 'ok' ? get(meta, 'renderer') : 'error';
    return getRenderer(renderer);
  }
}
