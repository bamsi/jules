import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtService } from '../services/service';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-clinical-overview',
  imports: [],
  templateUrl: './clinical-overview.html',
  styleUrl: './clinical-overview.scss',
})
export class ClinicalOverviewComponent implements OnInit {
  @ViewChild('dashboardContainer') container!: ElementRef;

  constructor(private jwtService: JwtService) {}
  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    this.jwtService
      .getToken({
        dashboardId: '32da9470-486c-4319-b381-da38736e5664',
      })
      .subscribe({
        next: (res) => {
          console.log(res.token);
          this.loadDashboard('32da9470-486c-4319-b381-da38736e5664', res.token);
          // Use this token to embed Superset dashboard
        },
        error: (err) => {
          console.error('Failed to fetch token', err);
        },
      });
  }
  loadDashboard(dashboardId: string, token: string) {
    embedDashboard({
      id: dashboardId,
      supersetDomain: environment.supersetUrl, // No trailing slash!
      mountPoint: this.container.nativeElement,
      fetchGuestToken: () => Promise.resolve(token),
      dashboardUiConfig: {
        hideTitle: true,
        filters: { expanded: false },
      },
    });
    this.enforceStyles();
    console.log('SDK initialized in direct mode');
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
