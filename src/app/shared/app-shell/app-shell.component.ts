import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';

import { IClient } from '@app/core/models';
import { SidebarService } from '@app/core/sidebar.service';

@Component({
  selector: 'sm-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
  @Input() appName = 'Services Manager';

  constructor(private sidebar: SidebarService) {
    console.log(this);
  }

  sidebarToggle() {
    this.sidebar.toggle();
  }
}
