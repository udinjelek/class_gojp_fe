import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUserManagementComponent } from './container-user-management.component';

describe('ContainerUserManagementComponent', () => {
  let component: ContainerUserManagementComponent;
  let fixture: ComponentFixture<ContainerUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerUserManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
