import { Component, OnInit } from '@angular/core';
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
  constructor(private jwtService: JwtService) {}
  ngOnInit(): void {
    const dashboardId = '32da9470-486c-4319-b381-da38736e5664';
    const token = this.jwtService.generateToken(dashboardId);
    this.loadDashboard(dashboardId, token);
  }

  async loadDashboard(dashboardId: string, token: string) {
    try {
      await embedDashboard({
        id: dashboardId,
        supersetDomain: '/dashboard', // No trailing slash!
        mountPoint: document.getElementById('dashboard-container')!,
        fetchGuestToken: () => Promise.resolve(token),
        dashboardUiConfig: {
          hideTitle: true,
          filters: { expanded: false },
        },
      });
      console.log('SDK initialized in direct mode');
    } catch (error) {
      console.error('SDK initialization failed:', error);
    }
  }
}
