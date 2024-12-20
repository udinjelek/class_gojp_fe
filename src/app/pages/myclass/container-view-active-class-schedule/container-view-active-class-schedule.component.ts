import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { AuthService } from '../../../shared/services/auth.service';
import { ClassService } from '../../../shared/services/class.service';
import { Renderer2 } from '@angular/core';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-container-view-active-class-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-view-active-class-schedule.component.html',
  styleUrl: './container-view-active-class-schedule.component.scss'
})
export class ContainerViewActiveClassScheduleComponent {
  schedulesList:any[]=[]
  isMobile: boolean = false;
  user_id:string=''
  constructor(private authService: AuthService, private classService: ClassService,private renderer: Renderer2,){
    this.user_id = this.authService.getLocalStorage('user_id') || "";
    this.call_getUserSchedule(this.user_id)
    this.checkScreenSize(); // Initial check
  }
  
  
  call_getUserSchedule(user_id:string){
    if (user_id != ""){
                this.classService.getScheduleUser(user_id).subscribe({
                  next: (response) => {
                    if (response.status) {
                      this.schedulesList = this.enrichScheduleWithCounts(response.data.schedule, response.data.count_member_class) ;

                      console.log('Schedule data:', this.schedulesList);
                    } else {
                      console.log('No schedule found:', response.message);
                    }
                  },
                  error: (error) => {
                    console.error('Error retrieving schedule:', error);
                  }
                });
    }
    
  }

  
  
  openLoginModal(): void {
    
    this.authService.triggerLogin();
  }

  openSignUpModal(): void {
    
    this.authService.triggerSignup();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust breakpoint value as needed
  }

  getDayNameFromDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  }

  enrichScheduleWithCounts(schedule: any[], countData: any[]) {
    if (!Array.isArray(schedule) || !Array.isArray(countData)) {
      console.error('Invalid input: schedule or countData is not an array');
      return schedule; // Return original schedule if input is invalid
    }
    return schedule.map(item => {
      // Find matching data based on course_id
      const match = countData.find(data => Number(data.course_id) === Number(item.course_id));
      if (match) {
        // Add count_member and member_slots if match is found
        return {
          ...item,
          count_member: match.count_member,
          member_slots: match.member_slots,
          student_id: match.student_id,
          student_name: match.student_name,
          student_profile_pic: match.student_profile_pic
        };
      }
      return item; // Return original item if no match found
    });
  }
  
  formatMinutesToHoursAndMinutesTable(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60); // Calculate full hours
    const minutes = totalMinutes % 60; // Calculate remaining minutes
  
    // Create a formatted string
    let result = '';
    if (hours > 0) {
      result += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (minutes > 0) {
      if (result.length > 0) result += '\n'; // Add space if there are hours
      result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
  
    return result || '0 minutes'; // Default to '0 minutes' if input is 0
  }
}
