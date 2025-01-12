import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/template/nav/nav.component';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ClassService } from '../../shared/services/class.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NavComponent
    , CommonModule
    , FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  user:any = {full_name:'',email:'',profile_pic:'', role:'', location:'' }
  token_id:string=''
  password:any={ new:'', confirm:''};
  modeView:string='Disable'
  message_output:string=''

  constructor(private route: ActivatedRoute, private authService: AuthService, private classService: ClassService,) 
  {}

  ngOnInit(): void {
    this.token_id = this.route.snapshot.paramMap.get('token') || '';
    this.loadResetPasswordData()
  }

  loadResetPasswordData(){
    this.classService.getValidResetPassword(this.token_id).subscribe({
      next: (response: any) => {

        if (response.status){
          this.modeView = 'UserInput'
          this.user = response.data
        }
        else{
          this.message_output = response.message
        }
        
      },
      error: (error) => {
          // Swal.fire({
          //           title: 'Error!',
          //           html: `Update Password failed!  <br>${error.error.message} `,
          //           icon: 'error',
          //           confirmButtonText: 'OK'
          //         });
      }
    });
  }

  isMatch(str1:string, str2:string):boolean{
    return str1 == str2 && str1 != '';
  }

  createNewPassword(){
    if ( !this.isMatch(this.password.new, this.password.confirm) ){
          Swal.fire({
            title: 'Error!',
            html: `Your new password and password confirmation must match and cannot be left blank. Please ensure both fields are identical.`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
    
          return;
        }
    // Call the class service to upload the profile picture
    this.classService.resetPassword(this.token_id, this.password.new, this.password.confirm).subscribe({
      next: (response: any) => {
        // Swal.fire({
        //   title: 'Complete!',
        //   html: `Password updated successfully.`,
        //   icon: 'success',
        //   confirmButtonText: 'OK'
        // });
        this.modeView = 'Disable'
        this.message_output = 'Password updated successfully.'
      },
      error: (error) => {
          Swal.fire({
                    title: 'Error!',
                    html: `Update Password failed!  <br>${error.error.message} `,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
      }
    });
  }
}
