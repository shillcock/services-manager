import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sm-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent implements OnInit {
  @Input() commands;

  constructor() {}

  ngOnInit() {}
}
