import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupersetService } from '../superset.service'; // Import the SupersetService
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-hr-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-summary.html',
  styleUrls: ['./hr-summary.scss']
})
export class HrSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('dashboardContainer') dashboardContainer!: ElementRef;

  // IMPORTANT: Replace with your actual Superset Dashboard UUID for HR Summary
  private dashboardId = 'YOUR_HR_SUMMARY_DASHBOARD_UUID';

  isLoading = true;
  errorMessage: string | null = null;

  // IMPORTANT: Replace with your actual Superset instance URL if different
  private supersetDomain = 'http://localhost:8088';

  constructor(
    private supersetService: SupersetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.dashboardId === 'YOUR_HR_SUMMARY_DASHBOARD_UUID') {
      console.warn('HrSummaryComponent: dashboardId is using a placeholder value. Please replace it with your actual Superset dashboard UUID.');
      this.errorMessage = 'Dashboard not configured. Please set the dashboard UUID.';
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    if (this.dashboardId !== 'YOUR_HR_SUMMARY_DASHBOARD_UUID') {
      this.loadDashboard();
    } else {
        this.isLoading = false;
        this.cdr.detectChanges();
    }
  }

  async loadDashboard() {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.detectChanges();

    if (!this.dashboardContainer) {
      this.errorMessage = 'Dashboard container element not found in the template.';
      this.isLoading = false;
      console.error(this.errorMessage);
      this.cdr.detectChanges();
      return;
    }

    try {
      const token = await this.supersetService.fetchGuestToken(
        this.dashboardId
        // Optionally, pass RLS or user attributes:
        // [], { username: 'hr_guest_user' }
      ).toPromise();

      if (!token) {
        throw new Error('Received null or undefined token from SupersetService.');
      }

      embedDashboard({
        id: this.dashboardId,
        supersetDomain: this.supersetDomain,
        mountPoint: this.dashboardContainer.nativeElement,
        fetchGuestToken: () => Promise.resolve(token),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
        // onDashboardMounted: () => {
        //   console.log('HR Summary Dashboard mounted');
        //   this.isLoading = false;
        //   this.cdr.detectChanges();
        // },
        // onDashboardError: (error) => {
        //   console.error('Superset Dashboard Error (HR Summary):', error);
        //   this.errorMessage = \`Error loading dashboard: \${error?.message || 'Unknown error'}\`;
        //   this.isLoading = false;
        //   this.cdr.detectChanges();
        // }
      });
      this.isLoading = false;
    } catch (error: any) {
      console.error('Failed to load HR Summary dashboard:', error);
      this.errorMessage = \`Failed to load dashboard: \${error.message || 'An unknown error occurred.'}\`;
      this.isLoading = false;
    } finally {
      this.cdr.detectChanges();
    }
  }
}
