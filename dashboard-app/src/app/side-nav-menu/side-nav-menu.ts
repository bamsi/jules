import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

@Component({
  selector: 'app-side-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule], // Add MatIconModule here
  templateUrl: './side-nav-menu.html',
  styleUrls: ['./side-nav-menu.scss']
})
export class SideNavMenuComponent {
  isCollapsed = false;
  @Output() collapseStateChanged = new EventEmitter<boolean>();

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseStateChanged.emit(this.isCollapsed);
  }
}
