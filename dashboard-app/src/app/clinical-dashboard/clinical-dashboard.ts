import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-clinical-dashboard',
  templateUrl: './clinical-dashboard.html',
  styleUrls: ['./clinical-dashboard.scss'],
  standalone: true, // Ensuring it's explicitly standalone
  imports: [] // Add CommonModule here if ngIf/ngFor etc. are needed in template
})
export class ClinicalDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('dashboardContainer') dashboardContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch this from your backend
    // and the backend would authenticate and authorize the user
    // before returning a guest token.
  }

  ngAfterViewInit(): void {
    this.embedClinicalDashboard();
  }

  async fetchGuestTokenForClinicalDashboard(): Promise<string> {
    // IMPORTANT: This is a placeholder.
    // In a real application, this method would make an HTTP call
    // to your backend endpoint that is responsible for generating
    // and returning a Superset guest token for this specific dashboard.
    // Example:
    // const response = await fetch('/api/get_superset_guest_token?dashboard_id=your_clinical_dashboard_id');
    // if (!response.ok) {
    //   throw new Error('Failed to fetch guest token');
    // }
    // const data = await response.json();
    // return data.token;

    console.warn('fetchGuestTokenForClinicalDashboard is using a placeholder token. Replace with actual backend integration.');
    // For demonstration purposes, returning a dummy or empty token.
    // The SDK might not work correctly without a valid token.
    return 'YOUR_PLACEHOLDER_GUEST_TOKEN_FOR_CLINICAL';
  }

  async embedClinicalDashboard() {
    const dashboardId = 'your_clinical_dashboard_uuid'; // Replace with your actual dashboard UUID
    const supersetDomain = 'http://localhost:8088'; // Replace with your Superset domain

    if (!this.dashboardContainer) {
      console.error('Dashboard container not found');
      return;
    }

    try {
      const guestToken = await this.fetchGuestTokenForClinicalDashboard();

      embedDashboard({
        id: dashboardId,
        supersetDomain: supersetDomain,
        mountPoint: this.dashboardContainer.nativeElement,
        fetchGuestToken: () => Promise.resolve(guestToken), // The SDK expects a function that returns a Promise<string>
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true
        },
      });
    } catch (error) {
      console.error('Error embedding Superset dashboard:', error);
      // Display a user-friendly error message in the container
      this.dashboardContainer.nativeElement.innerHTML = `
        <div style="padding: 20px; text-align: center; color: red;">
          <h3>Error Loading Clinical Dashboard</h3>
          <p>Could not load the dashboard. Please ensure Superset is running and the dashboard ID is correct.</p>
          <p>Details: ${error instanceof Error ? error.message : String(error)}</p>
        </div>
      `;
    }
  }
}
