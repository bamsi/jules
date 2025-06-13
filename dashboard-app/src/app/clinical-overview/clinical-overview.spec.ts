import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalOverview } from './clinical-overview';

describe('ClinicalOverview', () => {
  let component: ClinicalOverview;
  let fixture: ComponentFixture<ClinicalOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
