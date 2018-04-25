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
    const componentRef = this.container.createComponent<any>(componentFactory);
    componentRef.instance.context = this.context;
  }

  private getRenderer({ meta }: { meta: any }) {
    const renderer = get(meta, 'renderer');
    return getRenderer(get(renderer, 'id', renderer));
  }
}
