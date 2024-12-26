import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { NavComponent } from '../../shared/template/nav/nav.component';
import { AuthService } from '../../shared/services/auth.service';
import { ClassService } from '../../shared/services/class.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [  CommonModule,
              FormsModule,
              NavComponent,],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})

export class ProfileSettingsComponent implements OnInit {
  userData:any={full_name:'', profile_pic:''};
  passwords:any={current:'', new:'', confirm:''};
  selectedFile: File | null = null;
  constructor(private route: ActivatedRoute
    , private authService: AuthService
    , private classService: ClassService
    , private http: HttpClient) {
  }
  
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    const user_id:string = this.authService.getLocalStorage('user_id') || '';

    this.classService.getDetailSelf(user_id).subscribe({
      next: (response) => {
        if (response.status) {
          this.userData = response.data;
        } else {
          console.log('No teachers found:', response.message);
        }
      },
      error: (error) => {
        console.error('Error retrieving teachers data:', error);
      }
    });
  }

  saveProfile(){
    const user_data = this.userData;
    this.classService.updateProfile(user_data).subscribe({
      next: (response: any) => {
        console.log('Upload successful', response);
        // this.userData.profile_pic = response.new_profile_pic; // Update profile picture URL from response
        Swal.fire({
                    title: 'Complate!',
                    html: `Upload successful.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });
      },
      error: (error) => {
          Swal.fire({
                    title: 'Error',
                    text: 'Upload failed!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
      }
    });
  }

  uploadPhoto() {
    if (!this.selectedFile) {
      Swal.fire({
        title: 'Error!',
        html: `No file selected for upload.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });

        return;
    }

    // Get user ID from local storage
    const user_id: string = this.authService.getLocalStorage('user_id') || '';
    if (user_id === '') {
        Swal.fire({
          title: 'Error!',
          html: `User ID not found. Cannot proceed with photo upload.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
  
        return;
    }

    // Prepare form data and filename
    const form_data = new FormData();
    const file_name = this.selectedFile.name;
    form_data.append('file', this.selectedFile);

    // Call the class service to upload the profile picture
    this.classService.uploadProfilPic(user_id, form_data, file_name).subscribe({
        next: (response: any) => {
            console.log('Upload successful', response);
            // this.userData.profile_pic = response.new_profile_pic; // Update profile picture URL from response
            Swal.fire({
                        title: 'Complate!',
                        html: `Upload successful.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });
        },
        error: (error) => {
            Swal.fire({
                      title: 'Error',
                      text: 'Upload failed!',
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
        }
    });
  }

  
  updatePassword(){
    const user_id:string = this.authService.getLocalStorage('user_id') || '';
    const passwords_current = this.passwords.current
    const passwords_new =  this.passwords.new
    const passwords_confirm  =  this.passwords.confirm

    if ( !this.isMatch(passwords_new, passwords_confirm) ){
      Swal.fire({
        title: 'Error!',
        html: `Your new password and password confirmation must match and cannot be left blank. Please ensure both fields are identical.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });

      return;
    }

    // Call the class service to upload the profile picture
    this.classService.updatePassword(user_id, passwords_current, passwords_new, passwords_confirm).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Complate!',
          html: `Password updated successfully.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
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

  triggerFileInput() {
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    fileInput.click();
  }

  onPhotoSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.userData.profile_pic = e.target.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);

      // Call the upload function
      this.uploadPhoto();
    }
  }

  isMatch(str1:string, str2:string):boolean{
    return str1 == str2 && str1 != '';
  }
}
