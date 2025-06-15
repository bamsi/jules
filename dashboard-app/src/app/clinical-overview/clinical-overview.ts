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
        source: 'ZANEMR',
      })
      .subscribe({
        next: (res) => {
          this.loadDashboard('32da9470-486c-4319-b381-da38736e5664', res.token);
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
      supersetDomain: this.getDomain('ZANEMR'), 
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
