import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // For nested router outlet
import { SectionTabsComponent, TabLink } from '../section-tabs/section-tabs'; // Import shared tabs component and interface

@Component({
  selector: 'app-clinical-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SectionTabsComponent], // Add RouterOutlet and SectionTabsComponent
  templateUrl: './clinical-dashboard.html',
  styleUrls: ['./clinical-dashboard.scss']
})
export class ClinicalDashboardComponent {
  clinicalTabs: TabLink[] = [
    { label: 'Overview', path: '/clinicaldashboard/overview' },
    { label: 'Details', path: '/clinicaldashboard/details' }
    // Add more tabs as needed
  ];

  // The Superset embedding logic is removed from here.
  // It will be moved to one of the child components like ClinicalOverviewComponent later.

  constructor() { }
}
