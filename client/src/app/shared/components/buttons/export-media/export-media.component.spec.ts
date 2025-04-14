import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMediaComponent } from './export-media.component';

describe('ExportMediaComponent', () => {
  let component: ExportMediaComponent;
  let fixture: ComponentFixture<ExportMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
