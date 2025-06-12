import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { AppHeaderComponent } from './app-header/app-header.component'; // Import AppHeaderComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavMenuComponent, AppHeaderComponent, CommonModule], // Add AppHeaderComponent
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'dashboard-app';
  isMenuCollapsed = false;

  @HostBinding('class.menu-is-collapsed') get menuCollapsed() {
    return this.isMenuCollapsed;
  }

  onMenuCollapseChanged(collapsed: boolean) {
    this.isMenuCollapsed = collapsed;
  }
}
