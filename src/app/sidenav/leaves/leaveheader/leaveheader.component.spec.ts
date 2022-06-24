import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveheaderComponent } from './leaveheader.component';

describe('LeaveheaderComponent', () => {
  let component: LeaveheaderComponent;
  let fixture: ComponentFixture<LeaveheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
