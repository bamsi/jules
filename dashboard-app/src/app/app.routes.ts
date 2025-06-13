import { Routes } from '@angular/router';

import { ClinicalDashboardComponent } from './clinical-dashboard/clinical-dashboard';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard';
import { ClinicalOverviewComponent } from './clinical-overview/clinical-overview';
import { ClinicalDetailsComponent } from './clinical-details/clinical-details';
import { HrSummaryComponent } from './hr-summary/hr-summary';
import { HrReportsComponent } from './hr-reports/hr-reports';
export const routes: Routes = [
  {
    path: 'clinicaldashboard',
    component: ClinicalDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ClinicalOverviewComponent },
      { path: 'details', component: ClinicalDetailsComponent }
    ]
  },
  {
    path: 'hrdashboard',
    component: HrDashboardComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: HrSummaryComponent },
      { path: 'reports', component: HrReportsComponent }
    ]
  }
];
