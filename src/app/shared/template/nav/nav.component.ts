import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { Router } from '@angular/router'; // Import Router
import { RouterModule } from '@angular/router'; // Add this
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  userProfilePic: string | null = 'https://classgojp-file.polaris.my.id/images/default/caticon1.jpg'; // URL for the user's profile picture
  profile_pic: string | null = ''
  user_id: string | null = '';
  role: string | null = '';
  isNavbarCollapsed = true;
  full_name:string | null = '';
  phone_number:string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  showLoginModal: boolean = false;
  showSignUpModal: boolean = false;
  showResetPasswordModal: boolean = false;
  isResetButtonDisabled: boolean = false; // Disable button initially
  isResetEmailSent: boolean = false; // Flag to show success message
  isResetEmailError: boolean = false; // Flag for error message
  countdown: number = 60; // Starting countdown value (60 seconds)
  timer: any; // Variable to hold the timer

  ngOnInit() {
    this.authService.loginRequest.subscribe(() => {
      this.openLoginModal();
    });
    this.authService.signupRequest.subscribe(() => {
      this.openSignUpModal();
    });
    this.authService.updateUserProfilePicRequest.subscribe(() => {
      this.updateUserProfilePic();
    });
  }

  constructor(private authService: AuthService , private router: Router) {
    this.user_id = this.authService.getLocalStorage('user_id');
    this.updateUserProfilePic();
    this.full_name = this.authService.getLocalStorage('full_name');
    this.role = this.authService.getLocalStorage('role');
  }

  // Function to open the Login Modal and close Sign-Up Modal
  openLoginModal() {
    this.showSignUpModal = false;  // Close Sign-Up Modal
    this.showLoginModal = true;    // Open Login Modal
    this.showResetPasswordModal = false;
  }

  // Function to open the Sign-Up Modal and close Login Modal
  openSignUpModal() {
    this.showLoginModal = false;   // Close Login Modal
    this.showSignUpModal = true;   // Open Sign-Up Modal
    this.showResetPasswordModal = false;
  }

  openResetPasswordModal() {
    this.showLoginModal = false;   // Close Login Modal
    this.showSignUpModal = false;   // Open Sign-Up Modal
    this.showResetPasswordModal = true;
    this.isResetButtonDisabled = false;
    clearInterval(this.timer); 
  }
  
  switchToLogin(event: Event) {
    event.preventDefault();  // Prevents the default anchor behavior
    this.showSignUpModal = false;  // Close Sign-Up Modal
    this.showLoginModal = true;
    this.showResetPasswordModal = false;
  }

  // Function to switch from Login Modal to Sign-Up Modal
  switchToSignUp(event: Event) {
    event.preventDefault();  // Prevents the default anchor behavior
    this.showLoginModal = false;  // Close Login Modal
    this.showSignUpModal = true;
    this.showResetPasswordModal = false;
  }

  switchToResetPassword(event:Event){
    event.preventDefault();  // Prevents the default anchor behavior
    this.showLoginModal = false;  // Close Login Modal
    this.showSignUpModal = false;
    this.showResetPasswordModal = true;
    this.isResetButtonDisabled = false;
    this.isResetEmailSent = false; // Flag to show success message
    this.isResetEmailError = false;
    clearInterval(this.timer); 
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  closeSignUpModal() {
    this.showSignUpModal = false;
  }

  closeResetPasswordModal() {
    this.showResetPasswordModal = false;
    clearInterval(this.timer); 
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
                  const userData = {user_id: response.data.user_id, full_name: response.data.full_name , profile_pic: response.data.profile_pic, role:response.data.role }
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
              // Check if the error is an HTTP error with a response message
              if (error.status === 401 && error.error?.message) {
                Swal.fire({
                  title: 'Login Failed!',
                  text: error.error.message, // Use the message from the API response
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              } else {
                console.error('Error during login:', error);
                Swal.fire({
                  title: 'Error!',
                  text: 'There was an error when login',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            },
            // complete: () => {
            //   console.log('User creation process completed.');
            //   // optional completion handling
            // }
          });
  }

  onSignUp(event: Event) {

    if (!this.isValidAll() ){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      // early exit
      return;
    }

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
                      title: 'Complete!',
                      text: 'User creation process completed',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                    const userData = {user_id: response.data.user_id, full_name: response.data.full_name , profile_pic: response.data.profile_pic , role: response.data.role}
                    this.profile_pic = response.data.profile_pic; 
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

  onResetPassword(event: Event): void {
    event.preventDefault(); // Prevent form from reloading the page

    if (!this.isValid(this.email, 'email')  ){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      // early exit
      return;
    }

    this.isResetEmailSent = false;
    this.isResetEmailError = false;

    // Simulate reset email sending
    // this.simulateEmailSend();
    const resetRequest =  {  email: this.email }
          this.authService.requestResetPassword(resetRequest).subscribe({
            next: (response) => {
              if (response.status){
                    
                    // handle success
                    // Swal.fire({
                    //   title: 'Complete!',
                    //   text: 'Request reset password completed',
                    //   icon: 'success',
                    //   confirmButtonText: 'OK'
                    // });
                    this.isResetEmailSent = true

                    // Disable the reset button for 60 seconds to prevent spam
                    this.isResetButtonDisabled = true;
                    
                    // Start countdown timer
                    this.startCountdown(60);

                    // Disable the reset button for 60 seconds
                    setTimeout(() => {
                      this.isResetButtonDisabled = false; // Enable the button after 60 seconds
                    }, 60000); // 60 seconds
              }
              else{
                    // Swal.fire({
                    //   title: 'Error!',
                    //   text: response.message,
                    //   icon: 'error',
                    //   confirmButtonText: 'OK'
                    // });
                    this.isResetEmailError = true
              }
              
            },
            error: (error) => {
              console.error('Error request reset password:', error);
              // handle error
              // Swal.fire({
              //   title: 'Error!',
              //   text: 'There was an error request reset password',
              //   icon: 'error',
              //   confirmButtonText: 'OK'
              // });
              this.isResetEmailError = true
            },
            complete: () => {
              console.log('User creation process completed.');
              // optional completion handling
            }
          });
   
  }

  // Start the countdown timer
  startCountdown(second:number): void {
    this.countdown = second; // Reset the countdown
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Decrease the countdown every second
      } else {
        clearInterval(this.timer); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update every second
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
    this.full_name = ''
    this.role = ''
    this.user_id = ''
    this.userProfilePic = ''
    Swal.fire({
      title: 'Logout Successful!',
      html: `Thank you for spending your time with us, <strong style="color: darkblue;">${full_name}</strong>. <br />We hope to see you again soon!`,
      icon: 'success',
      confirmButtonText: 'Take care'
    });
  }

  updateUserProfilePic(){
    const profile_pic = this.authService.getLocalStorage('profile_pic')
    const full_name = this.authService.getLocalStorage('full_name')
    if (profile_pic){
      this.userProfilePic =  profile_pic ;
    }
    else {
      this.userProfilePic =  this.profile_pic ;
    }

    this.full_name = full_name;
    
  }

  
  isValidAll()
  {
    return (  this.isValid(this.full_name, 'full_name') 
    &&        this.isValid(this.phone_number, 'phone_number') 
    &&        this.isValid(this.email, 'email') 
    &&        this.isValid(this.password, 'password') 
    );
    
  }

  isValid(dataCheck: any, type: string): boolean {
    // const lengthCheck = (minLength: number) => dataCheck.length > minLength;
    const lengthCheck = (minLength: number) => {
      if (dataCheck) {
        return dataCheck.length > minLength;
      } else {
        return false;
      }
    };

    switch (type) {
      case 'full_name':
        return lengthCheck(3);
        
      case 'phone_number':
        return lengthCheck(6);
  
      case 'email':
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(dataCheck);

      case 'password':
          return ( dataCheck == this.confirm_password )&& dataCheck;

      default:
        return false;
    }
  }
  
  
}
