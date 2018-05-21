import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostListener,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[sm-contenteditable-model]'
})
export class ContenteditableModel implements OnChanges {
  @Input('sm-contenteditable-model') model: any;
  @Output('sm-contenteditable-modelChange') update = new EventEmitter();

  private lastViewModel: any;

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.lastViewModel = this.model;
    this.refreshView();
  }

  @HostListener('blur')
  onBlur() {
    var value = this.elRef.nativeElement.innerText;
    this.lastViewModel = value;
    this.update.emit(value);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any) {
    if (e.keyCode === 9) {
      document.execCommand('insertText', true, '  ');
      e.preventDefault();
    }
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model;
  }
}
