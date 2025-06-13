import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // For nested router outlet
import { SectionTabsComponent, TabLink } from '../section-tabs/section-tabs'; // Import shared tabs component and interface

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionTabsComponent], // Add RouterOutlet and SectionTabsComponent
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.scss']
})
export class HrDashboardComponent {
  hrTabs: TabLink[] = [
    { label: 'Summary', path: '/hrdashboard/summary' },
    { label: 'Reports', path: '/hrdashboard/reports' }
    // Add more tabs as needed
  ];

  // The Superset embedding logic is removed from here.
  // It will be moved to one of the child components like HrSummaryComponent later.

  constructor() { }
}
