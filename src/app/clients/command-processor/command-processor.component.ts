import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { CommandHandler } from '@app/core/models';
import { JsonProcessorComponent } from '../actions/json-processor.component';
import { RpcProcessorComponent } from '../actions/rpc-processor.component';

const PROCESSORS = {
  json: JsonProcessorComponent,
  rpc: RpcProcessorComponent
};

@Component({
  selector: 'sm-command-processor',
  templateUrl: './command-processor.component.html',
  styleUrls: ['./command-processor.component.scss']
})
export class CommandProcessorComponent implements OnInit, OnChanges {
  @Input() data: any;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.loadProcessor(changes.data.currentValue);
    }
  }

  private loadProcessor(data: any) {
    const componentFactory = this.resolver.resolveComponentFactory(
      PROCESSORS[data.processor] ? PROCESSORS[data.processor] : PROCESSORS[0]
    );

    this.container.clear();
    const componentRef = this.container.createComponent(componentFactory);
    (componentRef.instance as CommandHandler).data = data;
  }
}
