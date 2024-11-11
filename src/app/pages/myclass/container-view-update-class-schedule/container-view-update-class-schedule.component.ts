import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // For native date handling
import { MatFormFieldModule } from '@angular/material/form-field'; // For form field wrapper
import { MatInputModule } from '@angular/material/input'; // For input styling
import { AuthService } from '../../../shared/services/auth.service';
import { ClassService } from '../../../shared/services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-container-view-update-class-schedule',
  standalone: true,
  imports: [  CommonModule
    , MatDatepickerModule
    , MatNativeDateModule
    , MatFormFieldModule
    , MatInputModule // Import necessary modules for the Datepicker
  ],
  templateUrl: './container-view-update-class-schedule.component.html',
  styleUrl: './container-view-update-class-schedule.component.scss'
})
export class ContainerViewUpdateClassScheduleComponent {
  time_days: any[] = [];  
  time_hours: any[] = []; 
  dayOfWeek:string='';
  formattedDate:string='';
  showClassDetailModal:boolean=false;
  minDate = new Date();
  maxDate: Date;  
  courseDetailSelected:any={name:'',description:'', type_class:'', day_en:'', hour_ampm:''}
  courseMemberList:any[]=[
    {user_id:'',email:'', type_class:'', date:'', day_en:'', hour_ampm:'', full_name:''}
  ]
  constructor(private authService: AuthService, private classService: ClassService,) {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
  }

  myData:any = {  schedule: [
    // { date: "2024-10-01", day: "Thursday", time: "01:00 PM - 02:00 PM", status: "Available" },
    // { date: "2024-10-02", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Booked By Other" },
    // { date: "2024-10-03", day: "Saturday", time: "09:00 AM - 10:00 AM", status: "Available" },
    // { date: "2024-10-04", day: "Sunday", time: "11:00 AM - 12:00 PM", status: "Available" },
    // { date: "2024-10-05", day: "Monday", time: "02:00 PM - 03:00 PM", status: "Booked By Other" },
    // { date: "2024-10-06", day: "Tuesday", time: "10:00 AM - 11:00 AM", status: "Available" },
    // { date: "2024-10-07", day: "Wednesday", time: "04:00 PM - 05:00 PM", status: "Booked By Other" },
    // { date: "2024-10-08", day: "Thursday", time: "08:00 AM - 09:00 AM", status: "Available" },
    // { date: "2024-10-09", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Available" }
  ]
  };

  onDateChange(event: any): void {
    const selectedDate = event.value;
    this.formattedDate = new DatePipe('en-US').transform(selectedDate, 'yyyy-MM-dd') || '';

    // Get the day of the week
    this.dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });

    console.log('Selected date:', selectedDate);
    console.log('Selected date:', this.formattedDate); // yyyy-MM-dd
    console.log('Day of the week:', this.dayOfWeek);   // e.g., Monday, Tuesday
    
    // const dayId = this.getDayId(dayOfWeek)
    const user_id = this.authService.getLocalStorage('user_id') || ''
    this.getScheduleTeacher(user_id, user_id, this.formattedDate, this.dayOfWeek, true);


  }

  getDayId(dayOfWeek: string): number  {
    const day = this.time_days.find(d => d.day_en === dayOfWeek);
    return day ? day.id : -1;
  }

  getScheduleTeacher(teacher_id: string, student_id: string, selectedDate: any, dayOfWeek: string, showUnavailable: boolean){
    this.classService.getScheduleTeacher(teacher_id, student_id, selectedDate, dayOfWeek, showUnavailable).subscribe({
      next: (response) => {
        if (response.status) {
          this.time_days = response.data.days;
          this.time_hours = response.data.hours;
          this.myData.schedule = response.data.schedule;
          console.log('Schedule data:', this.myData.schedule);
        } else {
          console.log('No schedule found:', response.message);
        }
      },
      error: (error) => {
        console.error('Error retrieving schedule:', error);
      }
    });
  }
  
  toogleStatus(slot: any): void {
      console.log(slot)
      const teacherId = this.authService.getLocalStorage('user_id') || ""; // Retrieve teacher ID based on your app's logic
      const date = slot.date; // Example date, replace with selected date from UI
      const hourId = slot.hm_id; // Assuming slot has hour_id
      const setUnavailable = slot.status === 'Available';

      this.classService.setUnsetAvailability(teacherId, date, hourId, setUnavailable)
      .subscribe({
        next: (response) => {
          console.log('API response:', response);
          slot.status = setUnavailable ? 'Unavailable' : 'Available';
        },
        error: (error) => {
          console.error('Error updating availability:', error);
        }
      });
      slot.status = "Unavailable"


  }

  statusClicked(slot: any): void{
    if (slot.status === 'Booked'){
      this.showDetailCourseSelected(slot)
    }

  }

  showDetailCourseSelected(slot: any): void{
    if (slot.course_id ){
      // Swal.fire({
      //   title: 'Welcome back!',
      //   html: `it will show class id, <strong style="color: darkblue;">${slot.course_id}</strong>! <br>It will show Member id<br>list member ---`,
      //   icon: 'success',
      //   confirmButtonText: 'Proceed'
      // });
      const course_id = slot.course_id
      const date = slot.date
      const day = slot.day
      const hm_id = slot.hm_id
      const hour_ampm = slot.time
      this.classService.getDetailCourse(course_id).subscribe({
        next: (response) => {
          if (response.status) {
              this.courseDetailSelected = response.data.course_detail
              this.courseDetailSelected.date = date
              this.courseDetailSelected.hour_ampm = hour_ampm
              this.courseDetailSelected.day = day
              this.courseMemberList = response.data.member_list
          }
          else{

          }
        },
        error: (error) => {
          console.error('Error retrieving schedule:', error);
        }
      });

      this.showClassDetailModal= true
    }
  }

  closeClassDetailModal(){
    this.showClassDetailModal= false
  }
}
