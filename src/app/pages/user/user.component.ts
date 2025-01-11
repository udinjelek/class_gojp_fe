import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/template/nav/nav.component';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ClassService } from '../../shared/services/class.service';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user:any = {full_name:'',email:'',profile_pic:'', role:'', location:'' }
  target_id:string=''
  constructor(private route: ActivatedRoute, private authService: AuthService, private classService: ClassService,) 
  {}

  ngOnInit(): void {
    this.target_id = this.route.snapshot.paramMap.get('id') || '';
    this.getDataUser()
  }

  getDataUser(){
    const user_id:string = this.authService.getLocalStorage('user_id') || '';
      this.classService.getDataUser(this.target_id, user_id ).subscribe({
        next: (response) => {
          if (response.status) {
            this.user = response.data;
          } else {
            console.log('No teachers found:', response.message);
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (error) => {
          console.error('Error retrieving teachers data:', error);
          Swal.fire({
                      title: 'Error!',
                      text:error.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
        }
      });
  }
}
