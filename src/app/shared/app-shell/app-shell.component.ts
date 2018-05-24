import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SidebarService } from '@app/core/sidebar.service';

@Component({
  selector: 'sm-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
  @Input() appName = 'Services Manager';

  constructor(private sidebar: SidebarService) {}

  sidebarToggle() {
    this.sidebar.toggle();
  }
}
