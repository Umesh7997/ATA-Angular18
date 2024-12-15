import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingStatusComponent } from './view-booking-status.component';

describe('ViewBookingStatusComponent', () => {
  let component: ViewBookingStatusComponent;
  let fixture: ComponentFixture<ViewBookingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
