import { Component, Input } from '@angular/core';

import { AuthService, SidebarService } from '@app/core';

@Component({
  selector: 'sm-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
  @Input() appName = 'Services Manager';

  constructor(public sidebar: SidebarService, public auth: AuthService) {}
}
