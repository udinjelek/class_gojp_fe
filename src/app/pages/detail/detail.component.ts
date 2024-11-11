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
    showSuccessModal:boolean=false;
    successMessage:string='';

    
    time_days: any[] = [];  
    time_hours: any[] = []; 
    dayOfWeek:string='';
    formattedDate:string='';
    
  constructor(private route: ActivatedRoute, private authService: AuthService, private classService: ClassService,) {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
  }

  ngOnInit(): void {
    // Get the teacher ID from the route parameter
    this.teacherId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.teacherId )
    this.getDetailTeacher()
    
    // Find the teacher details by ID
    // load teacher data
    // if (this.teacherId) {
    //   this.teacherDetails = this.teachers.find(teacher => teacher.id === this.teacherId);
    // }
  }

  getDetailTeacher(){
    const id:string = this.teacherId
      this.classService.getDetailTeacher(id).subscribe({
        next: (response) => {
          if (response.status) {
            this.teacherDetails = response.data;
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

  prepareModal(slot: any, index:number): void {
    this.modalSlotIndex = index;
    this.modalSlot = slot;
    this.showBookingModal = true;  // Show the booking modal
  }

  closeBookingModal(): void {
    this.showBookingModal = false;  // Hide the booking modal
  }

  confirmBooking(): void {
    console.log('Booking confirmed', this.modalSlot);
    this.createCourseBystudent()
    
    this.showBookingModal = false;  // Hide the booking modal
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
    this.getScheduleTeacher(this.teacherId, this.user_id, this.formattedDate, this.dayOfWeek, false);

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
    this.classService.createCourseBystudent(this.user_id, this.teacherId, this.modalSlot.date, this.modalSlot.hm_id, 'Private').subscribe({
      next: (response) => {
        if (response.status) {
          console.log('Create Course By student data', this.teacherDetails.schedule);
          this.getScheduleTeacher(this.teacherId, this.user_id, this.formattedDate, this.dayOfWeek, false);
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
