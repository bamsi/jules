import { Component, ElementRef, ViewChild } from '@angular/core';
import { JwtService } from '../services/service';
import { environment } from '../environment/environment';
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.scss']
})
export class HrDashboardComponent {
  @ViewChild('dashboardContainer') container!: ElementRef;
  private dashboardId = 'a40570fe-4ecb-461f-9d8d-db3bcb03aa59';
  private source = 'HRH';
  constructor(private jwtService: JwtService) {}
  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    this.jwtService
      .getToken({
        dashboardId: this.dashboardId,
        source: this.source,
      })
      .subscribe({
        next: (res) => {
          this.loadDashboard(this.dashboardId, res.token);
        },
        error: (err) => {
          console.error('Failed to fetch token', err);
        },
      });
  }

  getDomain(source: string): string {
    const domain = environment.supersetUrl.find((url) => url.source === source);
    if (domain) {
      return domain.url;
    }
    return '';
  }
  loadDashboard(dashboardId: string, token: string) {
    embedDashboard({
      id: dashboardId,
      supersetDomain: this.getDomain(this.source), // No trailing slash!
      mountPoint: this.container.nativeElement,
      fetchGuestToken: () => Promise.resolve(token),
      dashboardUiConfig: {
        hideTitle: true,
        filters: { expanded: false },
        hideChartControls: false
      },
    });
    this.enforceStyles();
  }

  private enforceStyles() {
    const container = this.container.nativeElement;

    // Find all relevant elements that might contain charts
    const elements = [
      ...container.querySelectorAll('div[class*="chart"]'),
      ...container.querySelectorAll('iframe'),
      ...container.querySelectorAll('canvas'),
      ...container.querySelectorAll('.chart-container'), // Add any specific chart container classes
    ].filter((el) => !!el); // Filter out null elements

    elements.forEach((el: HTMLElement) => {
      // Apply responsive styles
      el.style.height = '100vh';
      el.style.width = '100%';
      el.style.overflow = 'hidden'; // Or 'auto' if scrolling is desired
      el.style.objectFit = 'contain'; // For iframes or images

      // Ensure proper display for different element types
      if (el.tagName.toLowerCase() === 'iframe') {
        el.style.border = 'none'; // Remove iframe border
      }

      // For canvas elements (common in charts)
      if (el.tagName.toLowerCase() === 'canvas') {
        el.style.display = 'block'; // Prevent inline spacing issues
      }
    });

    // Also style the container if needed
    container.style.position = 'relative';
    container.style.height = '100%';
  }
}
