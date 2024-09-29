import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor
import { RouterModule } from '@angular/router'; // Add this
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  title = 'teacher-list';
  searchTerm: string = '';
  teachers = [
    { id: 1,
      image_photo_profil: '/assets/images/teacher1.jpeg',
      name: 'Hiroshi Tanaka',
      location: 'Tokyo, Japan',
      status: 'Available',
      description: 'Expert in business Japanese with 10+ years of teaching experience to professionals.'
    },
    { id: 2,
      image_photo_profil: '/assets/images/teacher2.jpg',
      name: 'Yuki Nakamura',
      location: 'Osaka, Japan',
      status: 'Available',
      description: 'Fluent in English and specializes in teaching conversational Japanese for beginners.'
    },
    { id: 3,
      image_photo_profil: 'assets/images/teacher3.jpg',
      name: 'Sakura Yamamoto',
      location: 'Kyoto, Japan',
      status: 'Not Available',
      description: 'Teaches traditional Japanese and is passionate about Japanese literature and history.'
    },
    { id: 4,
      image_photo_profil: 'assets/images/teacher4.jpg',
      name: 'Kenji Suzuki',
      location: 'Sapporo, Japan',
      status: 'Available',
      description: 'Focuses on JLPT preparation and helps students achieve their language certification goals.'
    },
    { id: 5,
      image_photo_profil: 'assets/images/teacher5.jpg',
      name: 'Aiko Takahashi',
      location: 'Nagoya, Japan',
      status: 'Available',
      description: 'Specializes in teaching Japanese to children with a fun and engaging learning style.'
    },
    { id: 6,
      image_photo_profil: 'assets/images/teacher6.jpg',
      name: 'Ryohei Kobayashi',
      location: 'Fukuoka, Japan',
      status: 'Available',
      description: 'Experienced in teaching Japanese to tourists and travelers, focusing on everyday communication.'
    },
    { id: 7,
      image_photo_profil: 'assets/images/teacher7.jpg',
      name: 'Mai Shimizu',
      location: 'Hiroshima, Japan',
      status: 'Not Available',
      description: 'Offers classes in Japanese culture and etiquette alongside language lessons.'
    },
    { id: 8,
      image_photo_profil: 'assets/images/teacher8.jpg',
      name: 'Taro Fujimoto',
      location: 'Yokohama, Japan',
      status: 'Available',
      description: 'Skilled in teaching advanced Japanese, including reading and writing Kanji.'
    },
    { id: 9,
      image_photo_profil: 'assets/images/teacher9.jpg',
      name: 'Miki Saito',
      location: 'Kobe, Japan',
      status: 'Available',
      description: 'Bilingual in English and Japanese, focusing on personalized learning plans for each student.'
    },
    { id: 10,
      image_photo_profil: 'assets/images/teacher10.jpg',
      name: 'Haruki Matsuda',
      location: 'Sendai, Japan',
      status: 'Not Available',
      description: 'Experienced teacher for expatriates living in Japan, helping them adapt to the local culture.'
    },
    { id: 11,
      image_photo_profil: 'assets/images/teacher11.jpg',
      name: 'Kazuko Nishimura',
      location: 'Shizuoka, Japan',
      status: 'Available',
      description: 'Focuses on teaching Japanese through multimedia, including films and songs.'
    },
    { id: 12,
      image_photo_profil: 'assets/images/teacher12.jpeg',
      name: 'Takashi Yamashita',
      location: 'Nagano, Japan',
      status: 'Available',
      description: 'Specializes in teaching Japanese writing skills, particularly Kanji and essay composition.'
    }
  ];

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
