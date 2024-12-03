import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // For native date handling
import { MatFormFieldModule } from '@angular/material/form-field'; // For form field wrapper
import { MatInputModule } from '@angular/material/input'; // For input styling
import { AuthService } from '../../../shared/services/auth.service';
import { ClassService } from '../../../shared/services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-container-manage-custom-class',
  standalone: true,
  imports: [FormsModule
    , CommonModule
    , MatDatepickerModule
    , MatNativeDateModule
    , MatFormFieldModule
    , MatInputModule // Import necessary modules for the Datepicker
    ],
  templateUrl: './container-manage-custom-class.component.html',
  styleUrl: './container-manage-custom-class.component.scss'
})
export class ContainerManageCustomClassComponent implements OnInit{
  formattedDate='';
  dayOfWeek='';
  minDate = new Date();
  maxDate: Date;  
  isMobile: boolean = false;
  schedule_hours_ignore_weekly_template: any[] = []; 

  durations: { value: number; display: string }[] = [];
  selectedDuration: number = 60;
  draftScheduleBooking: any[]=[]
  showSchedulePicker: boolean = false;
  schedule:any[]=[
      {
          "count_member": 0,
          "course_id": null,
          "date": "2024-11-25",
          "day": "Monday",
          "hm_id": 200,
          "hour_24": "02:00",
          "member_slots": 0,
          "participant": 0,
          "status": "Available",
          "teacher_id": "fc543d9c",
          "time": "02:00 AM"
      },
      {
          "count_member": 0,
          "course_id": null,
          "date": "2024-11-25",
          "day": "Monday",
          "hm_id": 230,
          "hour_24": "02:30",
          "member_slots": 0,
          "participant": 0,
          "status": "Available",
          "teacher_id": "fc543d9c",
          "time": "02:30 AM"
      },
      {
          "count_member": 0,
          "course_id": null,
          "date": "2024-11-25",
          "day": "Monday",
          "hm_id": 300,
          "hour_24": "03:00",
          "member_slots": 0,
          "participant": 0,
          "status": "Available",
          "teacher_id": "fc543d9c",
          "time": "03:00 AM"
      },
      {
          "count_member": 0,
          "course_id": null,
          "date": "2024-11-25",
          "day": "Monday",
          "hm_id": 330,
          "hour_24": "03:30",
          "member_slots": 0,
          "participant": 0,
          "status": "Available",
          "teacher_id": "fc543d9c",
          "time": "03:30 AM"
      },
      {
        "count_member": 0,
        "course_id": null,
        "date": "2024-11-25",
        "day": "Monday",
        "hm_id": 200,
        "hour_24": "02:00",
        "member_slots": 0,
        "participant": 0,
        "status": "Available",
        "teacher_id": "fc543d9c",
        "time": "02:00 AM"
    },
    {
        "count_member": 0,
        "course_id": null,
        "date": "2024-11-25",
        "day": "Monday",
        "hm_id": 230,
        "hour_24": "02:30",
        "member_slots": 0,
        "participant": 0,
        "status": "Available",
        "teacher_id": "fc543d9c",
        "time": "02:30 AM"
    },
    {
        "count_member": 0,
        "course_id": null,
        "date": "2024-11-25",
        "day": "Monday",
        "hm_id": 300,
        "hour_24": "03:00",
        "member_slots": 0,
        "participant": 0,
        "status": "Available",
        "teacher_id": "fc543d9c",
        "time": "03:00 AM"
    },
    {
        "count_member": 0,
        "course_id": null,
        "date": "2024-11-25",
        "day": "Monday",
        "hm_id": 330,
        "hour_24": "03:30",
        "member_slots": 0,
        "participant": 0,
        "status": "Available",
        "teacher_id": "fc543d9c",
        "time": "03:30 AM"
    }
  ];
  activeSection: string = ''; // To track which section is active
  className: string = '';
  maxParticipants: number = 0;
  listScheduleCreate: any[] = [ {date:'2025-01-13', day:'Sunday', day_short:'Sun', time:'14:00 AM'}
                              , {date:'2025-01-20', day:'Sunday', day_short:'Sun', time:'18:00 AM'}
                              ]

  courses = [
    { name: 'Class 1', participants: 12, status: 'Active', totalClasses: 5 },
    { name: 'Class 2', participants: 8, status: 'Completed', totalClasses: 4 }
  ];

  constructor(private authService: AuthService, private classService: ClassService,) {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 12));
    this.checkScreenSize(); // Initial check
  }

  ngOnInit(): void {
    this.generateDurations();
  }

  generateDurations(){
    const maxDurationInMinutes = 480; // For example, up to 8 hours
    const increment = 30; // Increment by 30 minutes

    for (let minutes = 30; minutes <= maxDurationInMinutes; minutes += increment) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      this.durations.push({
        value: minutes,
        display: this.formatDuration(hours, remainingMinutes)
      });
    }
  }

  formatDuration(hours: number, minutes: number): string {
    // Customize display: Options for hour:minute format or descriptive
    // return `${hours}:${minutes.toString().padStart(2, '0')}`; // Example: 1:30
    // OR:
    return `${hours > 0 ? hours + ' Hour' + (hours > 1 ? 's' : '') : ''} ${minutes > 0 ? minutes + ' Minute' + (minutes > 1 ? 's' : '') : ''}`.trim();
  }

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  submitCustomClass(): void {
    console.log('Custom Class Created:', {
      name: this.className,
      maxParticipants: this.maxParticipants
    });
    // Reset form inputs after submission
    this.className = '';
    this.maxParticipants = 0;
    this.activeSection = ''; // Close the form after submission
  }

  closeSchedulePicker(){
    this.showSchedulePicker = false
  }

  openSchedulePicker(){
    this.showSchedulePicker = true
  }

  onDateChange(event:any){
    const selectedDate = event.value;
    this.formattedDate = new DatePipe('en-US').transform(selectedDate, 'yyyy-MM-dd') || '';

    // Get the day of the week
    this.dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });

    console.log('Selected date:', selectedDate);
    console.log('Selected date:', this.formattedDate); // yyyy-MM-dd
    console.log('Day of the week:', this.dayOfWeek);   // e.g., Monday, Tuesday
    
    // const dayId = this.getDayId(dayOfWeek)
    const user_id = this.authService.getLocalStorage('user_id') || ''
    this.getScheduleTeacherIgnoreWeeklyTemplate(user_id, this.formattedDate, this.dayOfWeek, true);
  }

  toogleStatus(slot:any){

  }
  statusClicked(slot:any){
    
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust breakpoint value as needed
  }

  scheduleTimeSelected( hour: any): void {
      const class_duration:number = this.selectedDuration || 0
      const available_time:number = this.checkAvailableTime(hour.id,this.schedule_hours_ignore_weekly_template)
      
      const text_class_duration:string = this.formatMinutesToHoursAndMinutes(class_duration )
      const text_available_time:string = this.formatMinutesToHoursAndMinutes(available_time)
      if (available_time < class_duration) {
        Swal.fire({
          title: 'Error!',
          html: `Booking this class is not possible at the selected time.
          <br>The teacher is only available for <strong style="color: darkblue;">${text_available_time}</strong> at <strong style="color: darkgreen;">${hour.hour_24}</strong>,
          <br>while the class you wish to book requires <strong style="color: darkred;">${text_class_duration}</strong>.
          <br><br>Please select another time.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else
      {
        // confirmation create class draft
        Swal.fire({
          title: 'Confirm Class Creation',
          html: `Are you sure you want to create a class at <strong style="color: darkblue;">${hour.hour_ampm}</strong> for <strong style="color: darkgreen;">${text_class_duration}</strong>?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, create it',
          cancelButtonText: 'No, cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            // Action to take when "Yes" is clicked
            console.log('Class confirmed!');
            this.addDraftClassSchedule(hour)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Action to take when "No" is clicked
            console.log('Class creation canceled!');
          }
        });

      }
  }

  addDraftClassSchedule(hour:any):void{
    const class_duration:number = this.selectedDuration || 0
    const initial_hour = hour.id;
    const dayDetail = this.getDayAndShortDay(this.formattedDate)
    const insertedHour = {
      ...hour, // Keep existing fields
      type: 'Draft', // Overwrites existing 'type'
      status: 'Draft', // Adds new 'status'
      duration: class_duration, // Overwrites existing 'duration'
      date: this.formattedDate,
      fullDay: dayDetail.fullDay,
      shortDay: dayDetail.shortDay,
      master_hour_id:initial_hour
    };

    this.draftScheduleBooking.push(insertedHour);

    
    console.log(this.draftScheduleBooking)

    // 
    // If class_duration > 30, add additional entries in increments of 30
    if (class_duration > 30) {
      
      const increments = Math.floor(class_duration / 30) - 1; // Number of additional 30-minute slots needed

      for (let i = 1; i <= increments; i++) {
        const offsetId = initial_hour + i * 30; // Calculate the next hour's ID
        const offsetHour = this.schedule_hours_ignore_weekly_template.find(h => h.id === offsetId);

        if (offsetHour) {
          const insertedOffsetHour = {
            ...offsetHour,
            status: 'Draft',
            type: 'in session',
            duration: 0, // Set duration to 0 for in-session blocks
            date: this.formattedDate,
            fullDay: dayDetail.fullDay,
            shortDay: dayDetail.shortDay,
            master_hour_id:initial_hour
          };
          this.draftScheduleBooking.push(insertedOffsetHour);
        } else {
          console.warn(`Hour with ID ${offsetId} not found in schedule.`);
        }
      }

      Swal.fire({
        title: 'Success!',
        html: `Class scheduled successfully at <strong style="color: darkgreen;">${hour.hour_24}</strong> for <strong>${this.formatMinutesToHoursAndMinutes(class_duration)}</strong>.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      this.closeSchedulePicker()
      this.updateScheduleFromDraft()
    }
  }

  updateScheduleFromDraft(): void {
    // Normalisasi
    this.schedule_hours_ignore_weekly_template.forEach((item) => {
      if (item.status === 'Draft') {
        item.status = 'Available';
        item.type = 'Available';
      }
    });

    // Filter draftScheduleBooking entries matching the current formatted date
    const draftsToReplace = this.draftScheduleBooking.filter(draft => draft.date === this.formattedDate);
  
    // Iterate over the draftsToReplace array
    draftsToReplace.forEach(draft => {
      // Find the corresponding entry in schedule_hours_ignore_weekly_template
      const scheduleIndex = this.schedule_hours_ignore_weekly_template.findIndex(
        schedule => schedule.id === draft.id
      );
  
      if (scheduleIndex !== -1) {
        // Replace the type and status fields in the matching entry
        this.schedule_hours_ignore_weekly_template[scheduleIndex] = {
          ...this.schedule_hours_ignore_weekly_template[scheduleIndex], // Keep other fields intact
          type: draft.type,
          status: draft.status
        };
      }
    });
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

  addDraftSchedule(){

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

  getScheduleTeacherIgnoreWeeklyTemplate(teacher_id: string, selectedDate: any, dayOfWeek: string, showUnavailable: boolean){
    this.classService.getScheduleTeacherIgnoreWeeklyTemplate(teacher_id, selectedDate, dayOfWeek, showUnavailable).subscribe({
      next: (response) => {
        if (response.status) {
          this.schedule_hours_ignore_weekly_template = response.data.schedule;
          this.updateScheduleFromDraft()
          console.log('Schedule data:', this.schedule_hours_ignore_weekly_template);
        } else {
          console.log('No schedule found:', response.message);
        }
      },
      error: (error) => {
        console.error('Error retrieving schedule:', error);
      }
    });
  }

  onDurationChange(value: number): void {
    console.log('Selected duration:', value);
    this.selectedDuration = value;
  }

  deleteDraftSchedule(schedule:any):void{
    this.draftScheduleBooking = this.draftScheduleBooking.filter(
      (item) => item.date !== schedule.date || item.master_hour_id !== schedule.master_hour_id
    );

    this.updateScheduleFromDraft()
  }

  setInputDefault(){
    this.className = ''
    this.maxParticipants = 0
    this.draftScheduleBooking = []
  }

  createClass(){
    // validasi data input
    let msgError = ''
    if (this.className == ''){
      msgError += '<br>- The class name is provided.'
    }
    if (this.maxParticipants <= 0){
      msgError += '<br>- Participants are greater than 0.'
    }
    if (this.draftScheduleBooking.length == 0){
      msgError += '<br>- At least one schedule is added to the Schedule List.'
    }


    if (msgError !== ''){

      msgError = 'Booking class failed. Please ensure the following:<br>' + msgError 
      Swal.fire({
        title: 'Error!',
        html: msgError,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
    else {
      Swal.fire({
        title: 'Confirm Class Creation',
        html: `Are you sure you want to create a custom course? <br><br>Course Name: <strong style="color: darkblue;">${this.className}</strong><br>Max Participants :<strong style="color: darkgreen;">${this.maxParticipants}</strong> persons<br>Total Classes: <strong style="color: darkred;">${this.countDraftClass()} </strong> times`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it',
        cancelButtonText: 'No, cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Action to take when "Yes" is clicked
          this.processCreateCustomClass()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Action to take when "No" is clicked
          console.log('Custom Class creation canceled!');
        }
      });
      
    }

  }

  countDraftClass():number{
    const draftCount = this.draftScheduleBooking.filter(schedule => schedule.type === 'Draft').length;
    return draftCount
  }

  processCreateCustomClass(){
    const draftSchedules = this.draftScheduleBooking.filter(schedule => schedule.type === 'Draft');
    const user_id = this.authService.getLocalStorage('user_id') || ''
    const teacher_id = user_id
    this.classService.createCustomCourse(user_id, teacher_id, this.className, this.maxParticipants, draftSchedules).subscribe({
      next: (response) => {
        if (response.status) {
          Swal.fire({
            title: 'Success!',
            html: `Create Custom Course Success.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          console.log('Create Custom Course Success');
          this.setInputDefault()

        } else {
          console.log('Create Custom Course Failed');
          Swal.fire({
            title: 'Failed!',
            html: `Create Custom Course Failed.`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          html: `Create Custom Course Error.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error Create Custom Course:', error);
      }
    });
    
  }
}
