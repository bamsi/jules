import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDetails } from './clinical-details';

describe('ClinicalDetails', () => {
  let component: ClinicalDetails;
  let fixture: ComponentFixture<ClinicalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
