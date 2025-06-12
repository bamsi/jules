import { Component, HostBinding } from '@angular/core'; // Added HostBinding
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavMenuComponent, CommonModule], // Added CommonModule and SideNavMenuComponent
  templateUrl: './app.html', // Corrected from app.component.html
  styleUrl: './app.scss', // Corrected from app.component.scss
})
export class AppComponent {
  title = 'dashboard-app';
  isMenuCollapsed = true; // Default state

  // Apply a class to the host element (app-root) for global styling adjustments
  @HostBinding('class.menu-is-collapsed') get menuCollapsed() {
    return this.isMenuCollapsed;
  }

  onMenuCollapseChanged(collapsed: boolean) {
    this.isMenuCollapsed = collapsed;
  }
}
