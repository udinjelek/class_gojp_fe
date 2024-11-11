import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerManageWeeklyScheduleTemplateComponent } from './container-manage-weekly-schedule-template.component';

describe('ContainerManageWeeklyScheduleTemplateComponent', () => {
  let component: ContainerManageWeeklyScheduleTemplateComponent;
  let fixture: ComponentFixture<ContainerManageWeeklyScheduleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerManageWeeklyScheduleTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerManageWeeklyScheduleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
