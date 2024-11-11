import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerViewUpdateClassScheduleComponent } from './container-view-update-class-schedule.component';

describe('ContainerViewUpdateClassScheduleComponent', () => {
  let component: ContainerViewUpdateClassScheduleComponent;
  let fixture: ComponentFixture<ContainerViewUpdateClassScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerViewUpdateClassScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerViewUpdateClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
