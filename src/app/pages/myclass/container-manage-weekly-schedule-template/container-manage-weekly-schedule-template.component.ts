import { Component, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ClassService } from '../../../shared/services/class.service';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor

import Swal from 'sweetalert2';

@Component({
  selector: 'app-container-manage-weekly-schedule-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-manage-weekly-schedule-template.component.html',
  styleUrl: './container-manage-weekly-schedule-template.component.scss'
})
export class ContainerManageWeeklyScheduleTemplateComponent {
  time_days: any[] = [];  
  time_hours: any[] = []; 

  selectedTimes: { day: number; hour: number }[] = [];
  saveSelections(): void {
    console.log('Saving selections to database:', this.selectedTimes);
    this.call_setWeeklyScheduleTemplate();
    
  }

  constructor(private authService: AuthService, private classService: ClassService,){
    this.call_getWeeklyScheduleTemplate()
  }

  call_setWeeklyScheduleTemplate(){
    const user_id = this.authService.getLocalStorage('user_id') || "";
    const selectedTimes = this.selectedTimes;
    const parmas = {user_id:user_id, selectedTimes: selectedTimes}
    this.classService.setWeeklyScheduleTemplate(parmas).subscribe({
      next: (response) => {
        if (response.status){
              console.log('User created successfully:', response);
              // handle success
              Swal.fire({
                title: 'Complete!',
                text: 'User creation process completed',
                icon: 'success',
                confirmButtonText: 'OK'
              });
            
        }
        else{
              Swal.fire({ title: 'Error!', text: response.message, icon: 'error', confirmButtonText: 'OK'});
        }
        
      },
      error: (error) => {
        console.error('Error creating user:', error);
        // handle error
        Swal.fire({ title: 'Error!', text: 'There was an error creating the user', icon: 'error', confirmButtonText: 'OK'});
      },
      complete: () => {
        console.log('User creation process completed.');
      }
    });
  }

  call_getWeeklyScheduleTemplate(){
      const user_id = this.authService.getLocalStorage('user_id') || "";
      this.classService.getWeeklyScheduleTemplate(user_id).subscribe({
          next: (response) => {
              if (response.status) {
                  console.log('Weekly Schedule Template:', response.data);
                  this.time_days = response.data.days
                  this.time_hours = response.data.hours
                  this.selectedTimes = response.data.schedule_templates
              } else {
                  console.log('Error loading schedule:', response.message);
              }
          },
        error: (err) => console.error('HTTP Error', err)
      });
  }

  toggleTimeSelection(day: number, hour: number): void {
    // Find the index of the object that matches both day and time
    const index = this.selectedTimes.findIndex(
        selection => selection.day === day && selection.hour === hour
    );

    // If the object exists, remove it; otherwise, add it
    if (index !== -1) {
        // Remove the existing selection
        this.selectedTimes.splice(index, 1);
    } else {
        // Add the new selection
        this.selectedTimes.push({ day, hour });
    }
  }

  isSelected(day: number, hour: number): boolean {
    return this.selectedTimes.some(selection => selection.day === day && selection.hour === hour);
  }
}
