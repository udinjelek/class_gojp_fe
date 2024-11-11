import { Component } from '@angular/core';
import { NavComponent } from '../../shared/template/nav/nav.component';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { AuthService } from '../../shared/services/auth.service';
import { ClassService } from '../../shared/services/class.service';

import { ContainerManageWeeklyScheduleTemplateComponent } from './container-manage-weekly-schedule-template/container-manage-weekly-schedule-template.component';
import { ContainerViewUpdateClassScheduleComponent } from './container-view-update-class-schedule/container-view-update-class-schedule.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-myclass',
  standalone: true,
  imports: [  CommonModule
    , NavComponent
    , ContainerManageWeeklyScheduleTemplateComponent
    , ContainerViewUpdateClassScheduleComponent
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
                            { date: "2024-10-01", day: "Thursday", time: "01:00 PM - 02:00 PM", status: "Available" },
                            { date: "2024-10-02", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Booked By Other" },
                            { date: "2024-10-03", day: "Saturday", time: "09:00 AM - 10:00 AM", status: "Available" },
                            { date: "2024-10-04", day: "Sunday", time: "11:00 AM - 12:00 PM", status: "Available" },
                            { date: "2024-10-05", day: "Monday", time: "02:00 PM - 03:00 PM", status: "Booked By Other" },
                            { date: "2024-10-06", day: "Tuesday", time: "10:00 AM - 11:00 AM", status: "Available" },
                            { date: "2024-10-07", day: "Wednesday", time: "04:00 PM - 05:00 PM", status: "Booked By Other" },
                            { date: "2024-10-08", day: "Thursday", time: "08:00 AM - 09:00 AM", status: "Available" },
                            { date: "2024-10-09", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Available" }
                ]
              };
  constructor(private authService: AuthService, private classService: ClassService,) {
      this.role = this.authService.getLocalStorage('role') || '';
      if (this.role == 'teacher'){
        this.activeTab = 'update'
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
          console.error('Error login:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error when login',
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
