import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerManageCustomClassComponent } from './container-manage-custom-class.component';

describe('ContainerManageCustomClassComponent', () => {
  let component: ContainerManageCustomClassComponent;
  let fixture: ComponentFixture<ContainerManageCustomClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerManageCustomClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerManageCustomClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
