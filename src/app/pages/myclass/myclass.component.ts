import { Component } from '@angular/core';
import { NavComponent } from '../../shared/template/nav/nav.component';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { AuthService } from '../../shared/services/auth.service';
import { ClassService } from '../../shared/services/class.service';

import { ContainerManageWeeklyScheduleTemplateComponent } from './container-manage-weekly-schedule-template/container-manage-weekly-schedule-template.component';
import { ContainerViewUpdateClassScheduleComponent } from './container-view-update-class-schedule/container-view-update-class-schedule.component';
import { ContainerViewActiveClassScheduleComponent } from './container-view-active-class-schedule/container-view-active-class-schedule.component';
import { ContainerManageCustomClassComponent } from './container-manage-custom-class/container-manage-custom-class.component';
import { ContainerUserManagementComponent } from './container-user-management/container-user-management.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-myclass',
  standalone: true,
  imports: [  CommonModule
    , NavComponent
    , ContainerManageWeeklyScheduleTemplateComponent
    , ContainerViewUpdateClassScheduleComponent
    , ContainerViewActiveClassScheduleComponent
    , ContainerManageCustomClassComponent
    , ContainerUserManagementComponent
  ],
  templateUrl: './myclass.component.html',
  styleUrl: './myclass.component.scss'
})
export class MyclassComponent {
  activeTab: string = 'view';  // Set the default active tab here
  
  setActiveTab(tab: string) {
      this.activeTab = tab;
      console.log(`Active tab set to: ${this.activeTab}`);
  }

  checkActiveTab(){
      console.log(`Active tab set to: ${this.activeTab}`);

  }

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  time_hours:any[] = [];
  time_days:any[] = [];
  role: string  = '';
  
  hoveredIndex: number = -1; // Flag to track hover status
  modalSlot: any=[];
  modalSlotIndex: number = -1;
  showBookingModal:boolean=false;
  showSuccessModal:boolean=false;
  successMessage:string='';
  myData:any = {  schedule: [
                ]
              };
  constructor(private authService: AuthService, private classService: ClassService,) {
      this.role = this.authService.getLocalStorage('role') || '';
      if (this.role == 'teacher'){
        this.activeTab = 'update'
      }
      if (this.role == 'admin'){
        this.activeTab = 'user'
      }
  }

  

  loadInitial(){
      this.classService.getListDaysHours().subscribe({
        next: (response) => {
          console.log (`===`)
          console.log (response)
          if (response.status){
            
            this.time_hours = response.data.hours
            this.time_days = response.data.days
            console.log(this.time_hours)
            console.log(this.time_days)

          }
          else{
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error when get the data',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        },

        });

  }
  
  prepareModal(slot: any, index:number): void {
    this.modalSlotIndex = index;
    this.modalSlot = slot;
    this.showBookingModal = true;  // Show the booking modal
  }

  confirmBooking(): void {
    console.log('Booking confirmed', this.modalSlot);
    this.myData.schedule[this.modalSlotIndex].status = "Booked By Me"
    // this.successMessage = 'Booking confirmed successfully';
    // this.showSuccessModal = true;  // Show success modal
    this.showBookingModal = false;  // Hide the booking modal
  }

  
  
}
