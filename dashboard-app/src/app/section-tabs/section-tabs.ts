import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TabLink {
  label: string;
  path: string; // Full path for the routerLink
}

@Component({
  selector: 'app-section-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './section-tabs.html',
  styleUrls: ['./section-tabs.scss']
})
export class SectionTabsComponent {
  @Input() tabs: TabLink[] = [];
  // The active state will be handled by RouterLinkActive

  constructor() { }
}
