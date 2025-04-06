import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavBarButtonsComponent } from './mobile-nav-bar-buttons.component';

describe('MobileNavBarButtonsComponent', () => {
  let component: MobileNavBarButtonsComponent;
  let fixture: ComponentFixture<MobileNavBarButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavBarButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavBarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
