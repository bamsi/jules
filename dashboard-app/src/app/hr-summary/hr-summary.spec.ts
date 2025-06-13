import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSummary } from './hr-summary';

describe('HrSummary', () => {
  let component: HrSummary;
  let fixture: ComponentFixture<HrSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
