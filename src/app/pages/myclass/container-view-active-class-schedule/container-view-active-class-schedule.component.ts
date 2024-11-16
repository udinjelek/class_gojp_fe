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
                      this.schedulesList = response.data.schedule;
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
}
