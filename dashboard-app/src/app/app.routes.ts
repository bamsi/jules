import { Routes } from '@angular/router';

import { ClinicalDashboardComponent } from './clinical-dashboard/clinical-dashboard';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard';
export const routes: Routes = [
  { path: 'clinicaldashboard', component: ClinicalDashboardComponent },
  { path: 'hrdashboard', component: HrDashboardComponent }
];
