import { Component , OnInit} from '@angular/core';
import { NavComponent } from '../../shared/template/nav/nav.component';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; // Add this
import { ClassService } from '../../shared/services/class.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule,RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})


export class ContactComponent implements OnInit {
  contactData = {
    contact_cs_email: 'support@example.com'
  , contact_cs_phone: '+1234567890'
  , contact_cs_whatsapp: '+1234567890'
  , contact_cs_telegram: '+1234567890'
  , contact_team_email: 'support@example.com'
  , contact_team_phone: '+1234567890'
  , contact_team_whatsapp: '+1234567890'
  , contact_team_telegram: '+1234567890'
  , 'link_facebook':``
  , 'link_instagram':``
  , 'link_x':``
  , 'link_linkedin':``
  , 'link_youtube':``
  , 'link_pinterest':''
  , 'link_snapchat':''
  , 'link_tiktok':''
  };

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.getContactPageContent()
  }

  getContactPageContent(){
    this.classService.getContactPageContent().subscribe({
      next: (response) => {
        if (response.status) {
          this.contactData = response.data;
        } else {
          console.log('No contact page content found:', response.message);
        }
      },
      error: (error) => {
        if (error.status != 404) {
          console.error('Error retrieving home page content data:', error);
        }
        
      }
      
    });
  }

  getAnimationDelay(index: number): string {
    return `${(index * 1)}s`;  // 0.1s delay for each card based on its index
  }
}
