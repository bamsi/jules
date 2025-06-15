import { Routes } from '@angular/router';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard';
import { ClinicalOverviewComponent } from './clinical-overview/clinical-overview';


export const routes: Routes = [
  { path: '', redirectTo: '/clinicaldashboard', pathMatch: 'full' },
  {
    path: 'clinicaldashboard',
    component: ClinicalOverviewComponent,
  },
  {
    path: 'hrdashboard',
    component: HrDashboardComponent,
  },
];
