import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu';
import { AppHeaderComponent } from './app-header/app-header';
import { LoadingService } from './services/loading';
import { Loader } from './loader/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavMenuComponent,
    CommonModule,
    AppHeaderComponent,
    Loader,
  ], // Added CommonModule and SideNavMenuComponent
  templateUrl: './app.html', // Corrected from app.component.html
  styleUrl: './app.scss', // Corrected from app.component.scss
})
export class AppComponent {
  title = 'dashboard-app';
  isMenuCollapsed = true; // Default state

  constructor(public loadingService: LoadingService) {}
  @HostBinding('class.menu-is-collapsed') get menuCollapsed() {
    return this.isMenuCollapsed;
  }

  onMenuCollapseChanged(collapsed: boolean) {
    this.isMenuCollapsed = collapsed;
  }
}
