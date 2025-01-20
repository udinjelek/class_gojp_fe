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

  contentBlocks = [
    {
      imageUrl: '/assets/images/colleagues-working-together-project.jpg',
      title: 'About Us',
      textHtml: `Welcome to GO JAPAN. <br> We provide flexible and engaging Japanese language lessons through experienced teachers, offering personalized learning experiences tailored to your needs. <br> Whether you're a beginner or looking to improve your fluency, we have the right teachers for you. <br><br> Our mission is to make language learning accessible, fun, and effective. We believe in the power of interactive and immersive learning, which is why our courses are designed to make you feel confident speaking Japanese in real-life situations.`,
      textHtmlMobile: `Welcome to GO JAPAN. <br> We provide flexible and engaging Japanese language lessons through experienced teachers, offering personalized learning experiences tailored to your needs.`
    },
    {
      imageUrl: '/assets/images/side-view-cropped-unrecognizable-business-people-working-common-desk.jpg',
      title: 'Our Values',
      textHtml: `At GO JAPAN, we believe in the importance of flexibility, inclusivity, and quality in education. <br> Our platform allows you to connect with the best teachers from around the world who are passionate about teaching and sharing their knowledge. <br><br> We understand that each student has unique learning preferences, so we provide a variety of options, including one-on-one lessons and group classes, to suit different needs and schedules. <br> By choosing a teacher who matches your learning style, you can achieve your language goals in an efficient and enjoyable way.`,
      textHtmlMobile: `At GO JAPAN, we believe in the importance of flexibility, inclusivity, and quality in education. <br> Our platform allows you to connect with the best teachers from around the world who are passionate about teaching and sharing their knowledge.`
    },
    {
      imageUrl: '/assets/images/four-acquainted-young-people-have-lively-conversation.jpg',
      title: 'Who Are We?',
      textHtml: `We are a team of dedicated professionals who are passionate about education and technology. <br> Our goal is to bridge the gap between students and experienced Japanese language teachers. <br><br> Our team includes skilled educators who have years of experience teaching Japanese to students from various cultural backgrounds. We strive to make learning a rewarding experience for everyone, regardless of their starting point. <br> Whether you're preparing for the JLPT or just want to learn Japanese for travel or business, we have courses that fit your needs.`,
      textHtmlMobile: `We are a team of dedicated professionals who are passionate about education and technology. <br> Our goal is to bridge the gap between students and experienced Japanese language teachers.`
    },
    // Add more blocks as needed
  ];

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
