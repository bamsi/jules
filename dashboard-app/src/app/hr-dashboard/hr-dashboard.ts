import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.scss'],
  standalone: true, // Ensuring it's explicitly standalone
  imports: [] // Add CommonModule here if ngIf/ngFor etc. are needed in template
})
export class HrDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('dashboardContainer') dashboardContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // Placeholder for any specific initialization if needed
  }

  ngAfterViewInit(): void {
    this.embedHrDashboard();
  }

  async fetchGuestTokenForHrDashboard(): Promise<string> {
    // IMPORTANT: This is a placeholder.
    // In a real application, this method would make an HTTP call
    // to your backend endpoint that is responsible for generating
    // and returning a Superset guest token for this specific dashboard.
    // Example:
    // const response = await fetch('/api/get_superset_guest_token?dashboard_id=your_hr_dashboard_id');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch guest token');
    // }
    // const data = await response.json();
    // return data.token;

    console.warn('fetchGuestTokenForHrDashboard is using a placeholder token. Replace with actual backend integration.');
    // For demonstration purposes, returning a dummy or empty token.
    return 'YOUR_PLACEHOLDER_GUEST_TOKEN_FOR_HR';
  }

  async embedHrDashboard() {
    const dashboardId = 'your_hr_dashboard_uuid'; // Replace with your actual HR dashboard UUID
    const supersetDomain = 'http://localhost:8088'; // Replace with your Superset domain

    if (!this.dashboardContainer) {
      console.error('Dashboard container not found for HR dashboard');
      return;
    }

    try {
      const guestToken = await this.fetchGuestTokenForHrDashboard();

      embedDashboard({
        id: dashboardId,
        supersetDomain: supersetDomain,
        mountPoint: this.dashboardContainer.nativeElement,
        fetchGuestToken: () => Promise.resolve(guestToken),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true
        },
      });
    } catch (error) {
      console.error('Error embedding Superset HR dashboard:', error);
      this.dashboardContainer.nativeElement.innerHTML = `
        <div style="padding: 20px; text-align: center; color: red;">
          <h3>Error Loading HR Dashboard</h3>
          <p>Could not load the dashboard. Please ensure Superset is running and the dashboard ID is correct.</p>
          <p>Details: ${error instanceof Error ? error.message : String(error)}</p>
        </div>
      `;
    }
  }
}
