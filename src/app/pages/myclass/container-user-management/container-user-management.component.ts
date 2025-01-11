import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Import CommonModule for NgFor
import { AuthService } from '../../../shared/services/auth.service';
import { ClassService } from '../../../shared/services/class.service';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; // Add this
import Swal from 'sweetalert2';

@Component({
  selector: 'app-container-user-management',
  standalone: true,
  imports: [
    FormsModule
    , CommonModule
    , RouterModule
  ],
  templateUrl: './container-user-management.component.html',
  styleUrl: './container-user-management.component.scss'
})
export class ContainerUserManagementComponent implements OnInit {
  dataCollection: any[] = []; // Holds the array of items from the API
  currentPage = 1;            // Current page number
  pageSize = 10;              // Items per page
  totalPages = 0;            // Total pages from the API response
  totalCount = 0;
  filterText = '';           // Search query entered by the user
  isLoading = false;         // To manage loading state
  user_id:string;
  isMobile:boolean = false;

   constructor(private authService: AuthService, private classService: ClassService,){
      this.user_id = this.authService.getLocalStorage('user_id') || "";
      this.checkScreenSize(); // Initial check
    }

    ngOnInit(): void {
        this.searchUsers()
    }

    checkScreenSize() {
      this.isMobile = window.innerWidth < 768; // Adjust breakpoint value as needed
    }

    searchUsers(){
      this.classService.getSearchUsers(this.filterText,this.currentPage).subscribe({
        next: (response) => {
          if (response.status) {
            this.dataCollection = response.data.user_list ;
            this.totalPages = response.data.total_pages ;
            this.totalCount = response.data.total_count ; 
          } else {
            console.log('No users found:', response.message);
          }
        },
        error: (error) => {
          console.error('Error retrieving users:', error);
        }
      });
    }

  // Trigger search when user clicks on Search button or presses Enter
  onSearch() {
    this.currentPage = 1; // Reset to first page for new search
    this.searchUsers();     // Call the API to fetch the data
  }

  // Trigger when user clicks on pagination buttons (Next/Previous)
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchUsers();     // Fetch data for the selected page
    }
  }

  
  editStatus(item:any){
    Swal.fire({
              title: 'Confirm Change Role',
              html: `Are you sure you want to change the role of <strong style="color: darkgreen;">${item.full_name}</strong> to <strong style="color: darkblue;">${this.invertLabelRole(item.role)}</strong>?`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes, create it',
              cancelButtonText: 'No, cancel'
            }).then((result) => {
              if (result.isConfirmed) {
                // Action to take when "Yes" is clicked
                this.invertRole(item.user_id)
                
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Action to take when "No" is clicked
                console.log('Class creation canceled!');
              }
            });
  }
  
  
  invertLabelRole(currentRole:string):string{
    if (currentRole == 'teacher')
    { return 'student';}
    if (currentRole == 'student')
    { return 'teacher';}
    return currentRole; 
  }

  invertRole(target_id:string){
    this.user_id = this.authService.getLocalStorage('user_id') || "";

    this.classService.setInvertRole(target_id,this.user_id).subscribe({
      next: (response) => {
        if (response.status) {
          this.searchUsers(); 
        } else {
          console.log('fail invert role:', response.message);
          Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                      });
        }
      },
      error: (error) => {
        console.error('Error invert role:', error);
        Swal.fire({
                              title: 'Error!.',
                              text:error.message,
                              icon: 'error',
                              confirmButtonText: 'OK'
                            });
      }
    });
  }
  

}
