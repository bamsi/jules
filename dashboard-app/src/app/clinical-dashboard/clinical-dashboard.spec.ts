import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDashboard } from './clinical-dashboard';

describe('ClinicalDashboard', () => {
  let component: ClinicalDashboard;
  let fixture: ComponentFixture<ClinicalDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
