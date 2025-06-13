import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupersetService } from '../superset.service'; // Import the new service
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-clinical-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinical-overview.html',
  styleUrls: ['./clinical-overview.scss']
})
export class ClinicalOverviewComponent implements OnInit, AfterViewInit {
  @ViewChild('dashboardContainer') dashboardContainer!: ElementRef;

  // IMPORTANT: Replace with your actual Superset Dashboard UUID for Clinical Overview
  private dashboardId = 'YOUR_CLINICAL_OVERVIEW_DASHBOARD_UUID';

  isLoading = true;
  errorMessage: string | null = null;

  // IMPORTANT: Replace with your actual Superset instance URL if different
  private supersetDomain = 'http://localhost:8088';

  constructor(
    private supersetService: SupersetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.dashboardId === 'YOUR_CLINICAL_OVERVIEW_DASHBOARD_UUID') {
      console.warn('ClinicalOverviewComponent: dashboardId is using a placeholder value. Please replace it with your actual Superset dashboard UUID.');
      this.errorMessage = 'Dashboard not configured. Please set the dashboard UUID.';
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    if (this.dashboardId !== 'YOUR_CLINICAL_OVERVIEW_DASHBOARD_UUID') {
      this.loadDashboard();
    } else {
        // If dashboardId is still placeholder, ensure loading is false.
        this.isLoading = false;
        this.cdr.detectChanges();
    }
  }

  async loadDashboard() {
    this.isLoading = true;
    this.errorMessage = null;
    // It's good practice to call detectChanges if you've updated properties
    // that affect the view before starting async operations,
    // especially if change detection strategy is OnPush (though not specified here).
    this.cdr.detectChanges();

    if (!this.dashboardContainer) {
      this.errorMessage = 'Dashboard container element not found in the template.';
      this.isLoading = false;
      console.error(this.errorMessage);
      this.cdr.detectChanges();
      return;
    }

    try {
      // Fetch the guest token using the SupersetService
      const token = await this.supersetService.fetchGuestToken(
        this.dashboardId
        // Optionally, pass RLS rules or user attributes if needed for this dashboard:
        // [{ clause: 'region_id = 123' }],
        // { username: 'clinical_guest_user' }
      ).toPromise(); // Using toPromise() for async/await style

      if (!token) {
        throw new Error('Received null or undefined token from SupersetService.');
      }

      embedDashboard({
        id: this.dashboardId,
        supersetDomain: this.supersetDomain,
        mountPoint: this.dashboardContainer.nativeElement,
        fetchGuestToken: () => Promise.resolve(token), // Provide the fetched token
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
          // Add other UI configurations as needed
        },
        // Optional: event listeners for more granular control
        // onDashboardMounted: () => {
        //   console.log('Clinical Overview Dashboard mounted');
        //   this.isLoading = false; // Ensure loading is false once mounted
        //   this.cdr.detectChanges();
        // },
        // onDashboardError: (error) => {
        //   console.error('Superset Dashboard Error (Clinical Overview):', error);
        //   this.errorMessage = \`Error loading dashboard: \${error?.message || 'Unknown error'}\`;
        //   this.isLoading = false;
        //   this.cdr.detectChanges();
        // }
      });
      // Assuming embedDashboard is synchronous in its setup before actual rendering starts.
      // If it has its own internal async loading, the onDashboardMounted callback is better for isLoading=false.
      // For simplicity here, setting isLoading to false after initiating embed.
      this.isLoading = false;
    } catch (error: any) {
      console.error('Failed to load Clinical Overview dashboard:', error);
      this.errorMessage = \`Failed to load dashboard: \${error.message || 'An unknown error occurred.'}\`;
      this.isLoading = false;
    } finally {
      this.cdr.detectChanges(); // Ensure UI updates with final state
    }
  }
}
