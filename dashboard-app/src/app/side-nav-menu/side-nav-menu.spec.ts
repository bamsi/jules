import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavMenu } from './side-nav-menu';

describe('SideNavMenu', () => {
  let component: SideNavMenu;
  let fixture: ComponentFixture<SideNavMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
