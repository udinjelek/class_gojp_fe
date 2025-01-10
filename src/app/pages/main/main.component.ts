import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor
import { RouterModule } from '@angular/router'; // Add this
import { FormsModule } from '@angular/forms'; 
import { NavComponent } from '../../shared/template/nav/nav.component';
import { ClassService } from '../../shared/services/class.service';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavComponent, ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'teacher-list';
  searchTerm: string = '';

  teachers:any[] = [];

  constructor(private authService: AuthService, private classService: ClassService,) {
  }

  ngOnInit(): void {
      this.getListTeachers()  
  }

  getListTeachers(){
    this.classService.getListTeachers().subscribe({
      next: (response) => {
        if (response.status) {
          this.teachers = response.data;
          console.log('teachers data:', this.teachers);
        } else {
          console.log('No teachers found:', response.message);
        }
      },
      error: (error) => {
        if (error.status != 404) {
          console.error('Error retrieving teachers data:', error);
          Swal.fire({
            title: 'Error!',
            html: `Unable to connect to the server. Please check your internet connection or try again later.`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        
      }
    });
  }

  filteredTeachers(): any[] {
    // If searchTerm is blank, return all teachers
    if (!this.searchTerm) {
      return this.teachers;
    }
    
    // Filter teachers based on searchTerm, ignoring case sensitivity
    return this.teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
