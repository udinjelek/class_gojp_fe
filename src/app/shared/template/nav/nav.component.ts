import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { Router } from '@angular/router'; // Import Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  userProfilePic: string | null = 'https://classgojp-file.polaris.my.id/images/default/caticon1.jpg'; // URL for the user's profile picture
  isNavbarCollapsed = true;
  full_name:string = '';
  phone_number:string = '';
  email: string = '';
  password: string = '';
  showLoginModal: boolean = false;
  showSignUpModal: boolean = false;

  constructor(private authService: AuthService , private router: Router) {}

  // Function to open the Login Modal and close Sign-Up Modal
  openLoginModal() {
    this.showSignUpModal = false;  // Close Sign-Up Modal
    this.showLoginModal = true;    // Open Login Modal
  }

  // Function to open the Sign-Up Modal and close Login Modal
  openSignUpModal() {
    this.showLoginModal = false;   // Close Login Modal
    this.showSignUpModal = true;   // Open Sign-Up Modal
  }

  
  switchToLogin(event: Event) {
    event.preventDefault();  // Prevents the default anchor behavior
    this.showSignUpModal = false;  // Close Sign-Up Modal
    this.showLoginModal = true;
    
  }

  // Function to switch from Login Modal to Sign-Up Modal
  switchToSignUp(event: Event) {
    event.preventDefault();  // Prevents the default anchor behavior
    this.showLoginModal = false;  // Close Login Modal
    this.showSignUpModal = true;
  
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  closeSignUpModal() {
    this.showSignUpModal = false;
  }

  onLogin(event: Event) {
    event.preventDefault();  // Prevent default form behavior
    console.log('Login form submitted');
    this.closeLoginModal();  // Close the login modal after submission
          const loginRequest =  { email: this.email, password: this.password }
          this.authService.userLogin(loginRequest).subscribe({
            next: (response) => {
              if (response.status){
                  console.log('User login successfully:', response);
                  const userData = {user_id: response.data.user_id, full_name: response.data.full_name , profile_pic: response.data.profile_pic }
                  this.authService.login(userData);
                  // handle success
                  const full_name = this.authService.getLocalStorage('full_name');
                  Swal.fire({
                    title: 'Welcome back!',
                    html: `Hello, <strong style="color: darkblue;">${full_name}</strong>! We're happy to see you again.`,
                    icon: 'success',
                    confirmButtonText: 'Proceed'
                  });
                  this.updateUserProfilePic()
              }
              else{
                  Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
              }
            },
            error: (error) => {
              console.error('Error login:', error);
              Swal.fire({
                title: 'Error!',
                text: 'There was an error when login',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            },
            // complete: () => {
            //   console.log('User creation process completed.');
            //   // optional completion handling
            // }
          });
  }

  onSignUp(event: Event) {
    event.preventDefault();  // Prevent default form behavior
    console.log('Sign-up form submitted');
    this.closeSignUpModal();  // Close the sign-up modal after submission

          const userDataCreate =  { full_name: this.full_name , phone_number: this.phone_number, email: this.email, password: this.password }
          this.authService.createUser(userDataCreate).subscribe({
            next: (response) => {
              if (response.status){
                    console.log('User created successfully:', response);
                    // handle success
                    Swal.fire({
                      title: 'Complate!',
                      text: 'User creation process completed',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                    const userData = {user_id: response.data.user_id, full_name: response.data.full_name , profile_pic: response.data.profile_pic }
                    this.authService.login(userData);
                    this.updateUserProfilePic()
              }
              else{
                    Swal.fire({
                      title: 'Error!',
                      text: response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                    });
              }
              
            },
            error: (error) => {
              console.error('Error creating user:', error);
              // handle error
              Swal.fire({
                title: 'Error!',
                text: 'There was an error creating the user',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            },
            complete: () => {
              console.log('User creation process completed.');
              // optional completion handling
            }
          });
  }
  // Function to toggle the navbar collapse state
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Check login status
  }

  logout(){
    const full_name = this.authService.getLocalStorage('full_name');
    this.authService.logout();
    this.router.navigate(['/']);
    Swal.fire({
      title: 'Logout Successful!',
      html: `Thank you for spending your time with us, <strong style="color: darkblue;">${full_name}</strong>. <br />We hope to see you again soon!`,
      icon: 'success',
      confirmButtonText: 'Take care'
    });
  }

  updateUserProfilePic(){
    const profile_pic = this.authService.getLocalStorage('profile_pic')
    if (profile_pic){
      this.userProfilePic = 'https://classgojp-file.polaris.my.id/' + profile_pic ;
    }
    
  }
}
