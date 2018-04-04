import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sm-rpc-list',
  templateUrl: './rpc-list.component.html',
  styleUrls: ['./rpc-list.component.scss']
})
export class RpcListComponent implements OnInit {
  @Input() items;

  @Output() selected = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
