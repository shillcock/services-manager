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
import { Processor } from '@app/core/models';
import { JsonProcessorComponent } from '../json-processor.component';
import { RpcProcessorComponent } from '../rpc-processor.component';

const PROCESSORS = {
  json: JsonProcessorComponent,
  rpc: RpcProcessorComponent
};

@Component({
  selector: 'sm-action-processor',
  templateUrl: './action-processor.component.html',
  styleUrls: ['./action-processor.component.scss']
})
export class ActionProcessorComponent implements OnInit, OnChanges {
  @Input() data: string;

  @ViewChild('processorTarget', { read: ViewContainerRef })
  processorTarget: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.loadProcessor(changes.data.currentValue);
    }
  }

  private loadProcessor(data: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      data.processor ? PROCESSORS[data.processor] : PROCESSORS[0]
    );

    this.processorTarget.clear();
    const componentRef = this.processorTarget.createComponent(componentFactory);
    (componentRef.instance as Processor).data = data;
  }
}
