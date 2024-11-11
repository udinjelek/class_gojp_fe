import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerViewActiveClassScheduleComponent } from './container-view-active-class-schedule.component';

describe('ContainerViewActiveClassScheduleComponent', () => {
  let component: ContainerViewActiveClassScheduleComponent;
  let fixture: ComponentFixture<ContainerViewActiveClassScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerViewActiveClassScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerViewActiveClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
