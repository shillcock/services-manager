import { Component, Input } from '@angular/core';

import { AuthService, SidebarService } from '@app/core';
import { APP_NAME } from '@app/shared/consts';

@Component({
  selector: 'sm-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
  @Input() appName = APP_NAME;

  constructor(public sidebar: SidebarService, public auth: AuthService) {}
}
