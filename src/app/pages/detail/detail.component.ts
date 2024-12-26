import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // For native date handling
import { MatFormFieldModule } from '@angular/material/form-field'; // For form field wrapper
import { MatInputModule } from '@angular/material/input'; // For input styling
import { FormsModule } from '@angular/forms'; 
import { NavComponent } from '../../shared/template/nav/nav.component';
import { ClassService } from '../../shared/services/class.service';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NavComponent,
    MatInputModule // Import necessary modules for the Datepicker
    ],
  templateUrl: './detail.component.html',
  styleUrls:['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    minDate = new Date();
    maxDate: Date;  
    user_id:string ='';
    teacherId: string = '';
    teacherDetails: any = {id:''};
    hoveredIndex: number = -1; // Flag to track hover status
    modalSlot: any=[];
    modalSlotIndex: number = -1;
    showBookingModal:boolean=false;
    showBookingGroupModal:boolean = false;
    showSuccessModal:boolean=false;
    successMessage:string='';
    listGroupCourses: any=[];
    scheduleGroupCourse: any=[];

    selectedDetailGroupRow: number | null = null;

    time_days: any[] = [];  
    time_hours: any[] = []; 
    dayOfWeek:string='';
    formattedDate:string='';
    isMobile: boolean = false;

    showScheduleGroup:boolean = false;
    groupCourseSelected: any = {name:''};

  constructor(private route: ActivatedRoute, private authService: AuthService, private classService: ClassService,) {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
  }

  ngOnInit(): void {
    // Get the teacher ID from the route parameter
    this.teacherId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.teacherId )
    this.getDetailTeacher()
    this.checkScreenSize()
    // Find the teacher details by ID
    // load teacher data
    // if (this.teacherId) {
    //   this.teacherDetails = this.teachers.find(teacher => teacher.id === this.teacherId);
    // }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust breakpoint value as needed
  }

  getDetailTeacher(){
    const teacher_id:string = this.teacherId;
    const user_id:string = this.authService.getLocalStorage('user_id') || '';
      this.classService.getDetailTeacher(teacher_id, user_id ).subscribe({
        next: (response) => {
          if (response.status) {
            this.teacherDetails = response.data.profile;
            this.listGroupCourses = response.data.listGroupCourses;
            console.log(this.listGroupCourses)
            console.log('teachers data:', this.teacherDetails);
          } else {
            console.log('No teachers found:', response.message);
          }
        },
        error: (error) => {
          console.error('Error retrieving teachers data:', error);
        }
      });
  }

  bookTeacher() {
    alert(`Booking ${this.teacherDetails.name}`);
  }

  dateClass = (d: Date): string => {
    
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    // Example to circle the date '2024-10-20'
    if (year == 2024) {
        console.log('hai')
      return 'highlight-date'; // Add custom CSS class to specific date
    }
    console.log('hello')
    return 'highlight-date'; // Return empty string for unmarked dates
  }

  bookingThisSlot(slot:any, index:number): void{
    this.user_id = this.authService.getLocalStorage('user_id') || '';
    if (this.user_id == this.teacherId){
        const full_name = this.authService.getLocalStorage('full_name');
        Swal.fire({
          title: 'Error!',
          html: `<strong style="color: darkblue;">${full_name}</strong> you can't booking your own class.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
    else{
      this.prepareModal(slot, index);
    }
      
  }

  joinThisGroup(course:any, index:number, event: Event): void{
    event.stopPropagation();
    this.user_id = this.authService.getLocalStorage('user_id') || '';
    if (this.user_id == this.teacherId){
        const full_name = this.authService.getLocalStorage('full_name');
        Swal.fire({
          title: 'Error!',
          html: `<strong style="color: darkblue;">${full_name}</strong> you can't booking your own class.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
    }
    else if (this.user_id == ''){
      Swal.fire({
        title: 'Error!',
        html: `<strong style="color: darkblue;"></strong> Please log in before booking a class.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
    else{
      this.groupCourseSelected = course
      console.log(course)
      this.prepareGroupModal(course, index);
    }
  }
  
  joinCourse(){
    this.user_id = this.authService.getLocalStorage('user_id') || '';
    const course_id = this.groupCourseSelected.course_id
    const student_id = this.user_id // kebetulan user (orang yg login, dan student adalah orang yg sama)
    this.classService.joinCourse(this.user_id, course_id, student_id).subscribe({
      next: (response) => {
        if (response.status) {
          this.getDetailTeacher()
          this.getScheduleTeacher(this.teacherId, this.user_id, this.formattedDate, this.dayOfWeek, true);
          // handle success
          Swal.fire({
            title: 'Complate!',
            html: `Congratulations! You've successfully joined the <strong style="color: darkblue;">${this.groupCourseSelected.name}</strong> class.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
                      title: 'Error!',
                      text: response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
        }
      },
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
    
  }

  prepareModal(slot: any, index:number): void {
    this.modalSlotIndex = index;
    this.modalSlot = slot;
    this.showBookingModal = true;  // Show the booking modal
  }

  prepareGroupModal(slot: any, index:number): void {
    // this.modalSlotIndex = index;
    // this.modalSlot = slot;
    this.showBookingGroupModal = true;  // Show the booking modal
  }

  closeBookingModal(): void {
    this.showBookingModal = false;  // Hide the booking modal
  }

  closeBookingGroupModal(): void {
    this.showBookingGroupModal = false;  // Hide the booking modal
  }

  confirmBooking(): void {
    console.log('Booking confirmed', this.modalSlot);
    this.createCourseBystudent()
    
    this.showBookingModal = false;  // Hide the booking modal
  }

  confirmBookingGroup(): void {
    this.joinCourse()
    this.showBookingGroupModal = false;  // Hide the booking modal
  }
  
  onDateChange(event: any): void {
    const selectedDate = event.value;
    this.formattedDate = new DatePipe('en-US').transform(selectedDate, 'yyyy-MM-dd') || '';

    // Get the day of the week
    this.dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });

    console.log('Selected date:', selectedDate);
    console.log('Selected date:', this.formattedDate); // yyyy-MM-dd
    console.log('Day of the week:', this.dayOfWeek);   // e.g., Monday, Tuesday
    
    // const dayId = this.getDayId(dayOfWeek)
    this.user_id = this.authService.getLocalStorage('user_id') || '';
    this.getScheduleTeacher(this.teacherId, this.user_id, this.formattedDate, this.dayOfWeek, true);

  }

  getScheduleTeacher(teacher_id:string, student_id: string, selectedDate: any, dayOfWeek: string, showUnavailable: boolean){
    this.classService.getScheduleTeacher(teacher_id, student_id, selectedDate, dayOfWeek, showUnavailable).subscribe({
      next: (response) => {
        if (response.status) {
          this.time_days = response.data.days;
          this.time_hours = response.data.hours;
          this.teacherDetails.schedule = response.data.schedule;
          console.log('Schedule data:', this.teacherDetails.schedule);
        } else {
          console.log('No schedule found:', response.message);
        }
      },
      error: (error) => {
        console.error('Error retrieving schedule:', error);
      }
    });
  }

  createCourseBystudent(){
    this.user_id = this.authService.getLocalStorage('user_id') || '';
    const class_duration:number = 60
    const available_time:number = this.checkAvailableTime(this.modalSlot.hm_id,this.teacherDetails.schedule)

    if (available_time < class_duration) {
      const text_class_duration:string = this.formatMinutesToHoursAndMinutes(class_duration )
      const text_available_time:string = this.formatMinutesToHoursAndMinutes(available_time)
      
      Swal.fire({
        title: 'Error!',
        html: `Booking this class is not possible at the selected time.
        <br>The teacher is only available for <strong style="color: darkblue;">${text_available_time}</strong> at <strong style="color: darkgreen;">${this.modalSlot.hour_24}</strong>,
        <br>while the class you wish to book requires <strong style="color: darkred;">${text_class_duration}</strong>.
        <br><br>Please select another time.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
    else{
      this.classService.createCourseBystudent(this.user_id, this.teacherId, this.modalSlot.date, this.modalSlot.hm_id, 'Private', 'Private Class', class_duration).subscribe({
        next: (response) => {
          if (response.status) {
            console.log('Create Course By student data', this.teacherDetails.schedule);
            this.getScheduleTeacher(this.teacherId, this.user_id, this.formattedDate, this.dayOfWeek, true);
          } else {
            console.log("Can't Create Course By student data", response.message);
          }
        },
        error: (error) => {
          console.error('Error retrieving schedule:', error);
        }
      });
    }
  }

  checkAvailableTime(hm_id_selected: number , schedule:any[]): number {
    const increment = 30; // Increment for each loop (30 minutes)
    let duration = 0; // Initialize duration

    for (let i = 0; i < 360; i++) {
      // Calculate the current hm_id
      const currentHmId = hm_id_selected + duration;  

      // Find the schedule with the current hm_id
      const currentSchedule = schedule.find(item => item.hm_id == currentHmId);
      
      // Increase the duration for the next iteration
      duration += increment;

      // Check if the schedule exists and its status is an empty string
      if (!currentSchedule || currentSchedule.status != 'Available' ) {
        // Stop if the status is not empty or the schedule is not found
        return duration - increment;
      }

    }

    // If the loop completes and all slots are valid, return the total duration
    return duration;
  }

  formatMinutesToHoursAndMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60); // Calculate full hours
    const minutes = totalMinutes % 60; // Calculate remaining minutes
  
    // Create a formatted string
    let result = '';
    if (hours > 0) {
      result += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    if (minutes > 0) {
      if (result.length > 0) result += ' '; // Add space if there are hours
      result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
  
    return result || '0 minutes'; // Default to '0 minutes' if input is 0
  }

  countValidSchedule():number{
    const totalValidSchedule = this.teacherDetails.schedule.filter((schedule: any) => schedule.status !== '').length;
    return totalValidSchedule
  }

  toggleDetails(course:any, index: number): void {
    // Toggle details for the clicked row
    this.selectedDetailGroupRow = this.selectedDetailGroupRow === index ? null : index;
    console.log(course)

    const course_id = course.course_id
    this.classService.getScheduleGroupCourse(course_id).subscribe({
      next: (response) => {
        if (response.status) {
          this.scheduleGroupCourse = response.data;
          
        } else {
          console.log('No schedule found:', response.message);
        }
      },
      error: (error) => {
        console.error('Error retrieving schedule:', error);
      }
    });
  }


  getDayAndShortDay(dateString: string): { fullDay: string; shortDay: string } {
    // Parse the input date string into a Date object
    const date = new Date(dateString);
  
    // Array for full day names and short day names
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayIndex = date.getDay();
  
    // Return the full day name and short day name
    return {
      fullDay: days[dayIndex],  // Full name of the day
      shortDay: shortDays[dayIndex] // Abbreviated name of the day
    };
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
    // if (slot.status === 'Booked'){
    //   this.showDetailCourseSelected(slot)
    // }

  }
  
  setShowScheduleGroup(val:boolean)
  {
    this.showScheduleGroup = val
  }

  showGroupScheduleDetails(course:any, index: number): void {
    // Toggle details for the clicked row
    this.selectedDetailGroupRow = this.selectedDetailGroupRow === index ? null : index;
    console.log(course)

    const course_id = course.course_id
    this.classService.getScheduleGroupCourse(course_id).subscribe({
      next: (response) => {
        if (response.status) {
          this.scheduleGroupCourse = response.data;
          this.setShowScheduleGroup(true)
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
