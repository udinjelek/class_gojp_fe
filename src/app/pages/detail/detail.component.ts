import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  teacherId: number | null = null;
  teacherDetails: any = null;

  teachers = [
    { id: 1,
      image_photo_profil: '/assets/images/teacher1.jpeg',
      name: 'Hiroshi Tanaka',
      location: 'Tokyo, Japan',
      status: 'Available',
      description: 'Expert in business Japanese with 10+ years of teaching experience to professionals.',
      message: 'I believe learning should be fun and engaging. My goal is to make Japanese easy and enjoyable for everyone!',
      students: 32,
      schedule: [
        { date: '2024-10-01', time: '10:00 AM - 11:00 AM', status: 'Available' },
        { date: '2024-10-01', time: '02:00 PM - 03:00 PM', status: 'Booked' },
        { date: '2024-10-02', time: '09:00 AM - 10:00 AM', status: 'Available' }
      ]
    },
    { id: 2,
      image_photo_profil: '/assets/images/teacher2.jpg',
      name: 'Yuki Nakamura',
      location: 'Osaka, Japan',
      status: 'Available',
      description: 'Fluent in English and specializes in teaching conversational Japanese for beginners.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 3,
      image_photo_profil: 'assets/images/teacher3.jpg',
      name: 'Sakura Yamamoto',
      location: 'Kyoto, Japan',
      status: 'Not Available',
      description: 'Teaches traditional Japanese and is passionate about Japanese literature and history.',
      about: 'I specialize in helping business professionals improve their Japanese communication skills, both written and spoken. My approach focuses on practical, real-world applications to get you confident in no time.',
      testimonial: 'Hiroshi helped me navigate my first business meeting in Japan with confidence! Highly recommend.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { day: 'Monday', times: '10:00 AM - 12:00 PM, 2:00 PM - 4:00 PM' },
        { day: 'Wednesday', times: '9:00 AM - 11:00 AM, 1:00 PM - 3:00 PM' },
        { day: 'Friday', times: '1:00 PM - 3:00 PM' },
      ]
    },
    { id: 4,
      image_photo_profil: 'assets/images/teacher4.jpg',
      name: 'Kenji Suzuki',
      location: 'Sapporo, Japan',
      status: 'Available',
      description: 'Focuses on JLPT preparation and helps students achieve their language certification goals.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 5,
      image_photo_profil: 'assets/images/teacher5.jpg',
      name: 'Aiko Takahashi',
      location: 'Nagoya, Japan',
      status: 'Available',
      description: 'Specializes in teaching Japanese to children with a fun and engaging learning style.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 6,
      image_photo_profil: 'assets/images/teacher6.jpg',
      name: 'Ryohei Kobayashi',
      location: 'Fukuoka, Japan',
      status: 'Available',
      description: 'Experienced in teaching Japanese to tourists and travelers, focusing on everyday communication.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 7,
      image_photo_profil: 'assets/images/teacher7.jpg',
      name: 'Mai Shimizu',
      location: 'Hiroshima, Japan',
      status: 'Not Available',
      description: 'Offers classes in Japanese culture and etiquette alongside language lessons.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]

    },
    { id: 8,
      image_photo_profil: 'assets/images/teacher8.jpg',
      name: 'Taro Fujimoto',
      location: 'Yokohama, Japan',
      status: 'Available',
      description: 'Skilled in teaching advanced Japanese, including reading and writing Kanji.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 9,
      image_photo_profil: 'assets/images/teacher9.jpg',
      name: 'Miki Saito',
      location: 'Kobe, Japan',
      status: 'Available',
      description: 'Bilingual in English and Japanese, focusing on personalized learning plans for each student.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 10,
      image_photo_profil: 'assets/images/teacher10.jpg',
      name: 'Haruki Matsuda',
      location: 'Sendai, Japan',
      status: 'Not Available',
      description: 'Experienced teacher for expatriates living in Japan, helping them adapt to the local culture.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 11,
      image_photo_profil: 'assets/images/teacher11.jpg',
      name: 'Kazuko Nishimura',
      location: 'Shizuoka, Japan',
      status: 'Available',
      description: 'Focuses on teaching Japanese through multimedia, including films and songs.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    },
    { id: 12,
      image_photo_profil: 'assets/images/teacher12.jpeg',
      name: 'Takashi Yamashita',
      location: 'Nagano, Japan',
      status: 'Available',
      description: 'Specializes in teaching Japanese writing skills, particularly Kanji and essay composition.',
      message: 'Let\'s learn Japanese step by step. I\'ll help you speak fluently in no time!',
      students: 25,
      schedule: [
        { date: '2024-10-01', time: '01:00 PM - 02:00 PM', status: 'Available' },
        { date: '2024-10-02', time: '03:00 PM - 04:00 PM', status: 'Booked' },
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Get the teacher ID from the route parameter
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    // Find the teacher details by ID
    if (this.teacherId) {
      this.teacherDetails = this.teachers.find(teacher => teacher.id === this.teacherId);
    }
  }

  bookTeacher() {
    alert(`Booking ${this.teacherDetails.name}`);
  }
}
