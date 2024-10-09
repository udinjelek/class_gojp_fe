import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CommonModule } from '@angular/common'; // Import CommonModule for NgFor
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // For native date handling
import { MatFormFieldModule } from '@angular/material/form-field'; // For form field wrapper
import { MatInputModule } from '@angular/material/input'; // For input styling

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule // Import necessary modules for the Datepicker
    ],
  templateUrl: './detail.component.html',
  styleUrls:['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    minDate = new Date();
    maxDate: Date;  
    teacherId: number | null = null;
    teacherDetails: any = null;
    hoveredIndex: number = -1; // Flag to track hover status
    modalSlot: any=[];
    modalSlotIndex: number = -1;
    showBookingModal:boolean=false;
    showSuccessModal:boolean=false;
    successMessage:string='';

    teachers = [
    {
        id: 1,
        image_photo_profil: '/assets/images/teacher1.jpeg',
        name: 'Hiroshi Tanaka',
        location: 'Tokyo, Japan',
        status: 'Available',
        description: 'Expert in business Japanese with 10+ years of teaching experience to professionals.',
        about: 'I specialize in business Japanese, helping professionals communicate effectively in corporate settings.',
        testimonial: 'Hiroshi’s teaching method is incredible! I felt much more confident in meetings after just a few lessons.',
        message: 'I believe learning should be fun and engaging. My goal is to make Japanese easy and enjoyable for everyone!',
        students: 32,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-05', day: 'Saturday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-07', day: 'Monday', time: '08:00 AM - 09:00 AM', status: 'Available' },
            { date: '2024-10-08', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'Available' }
        ]
    },
    {
        id: 2,
        image_photo_profil: '/assets/images/teacher2.jpg',
        name: 'Yuki Nakamura',
        location: 'Osaka, Japan',
        status: 'Available',
        description: 'Fluent in English and specializes in teaching conversational Japanese for beginners.',
        about: 'I am passionate about teaching beginners and making language learning approachable and fun.',
        testimonial: 'Yuki is a patient and encouraging teacher. I learned so much in such a short time.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '12:00 PM - 01:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '04:00 PM - 05:00 PM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'Available' }
        ]
    },
    {
      id: 3,
      image_photo_profil: "assets/images/teacher3.jpg",
      name: "Sakura Yamamoto",
      location: "Kyoto, Japan",
      status: "Not Available",
      description: "Teaches traditional Japanese and is passionate about Japanese literature and history.",
      about: "I specialize in helping business professionals improve their Japanese communication skills, both written and spoken. My approach focuses on practical, real-world applications to get you confident in no time.",
      testimonial: "Hiroshi helped me navigate my first business meeting in Japan with confidence! Highly recommend.",
      message: "Let's learn Japanese step by step. I'll help you speak fluently in no time!",
      students: 25,
      schedule: [
        { date: "2024-10-01", day: "Thursday", time: "01:00 PM - 02:00 PM", status: "Available" },
        { date: "2024-10-02", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Booked By Other" },
        { date: "2024-10-03", day: "Saturday", time: "09:00 AM - 10:00 AM", status: "Available" },
        { date: "2024-10-04", day: "Sunday", time: "11:00 AM - 12:00 PM", status: "Available" },
        { date: "2024-10-05", day: "Monday", time: "02:00 PM - 03:00 PM", status: "Booked By Other" },
        { date: "2024-10-06", day: "Tuesday", time: "10:00 AM - 11:00 AM", status: "Available" },
        { date: "2024-10-07", day: "Wednesday", time: "04:00 PM - 05:00 PM", status: "Booked By Other" },
        { date: "2024-10-08", day: "Thursday", time: "08:00 AM - 09:00 AM", status: "Available" },
        { date: "2024-10-09", day: "Friday", time: "03:00 PM - 04:00 PM", status: "Available" }
      ]
    },
    {
        id: 4,
        image_photo_profil: 'assets/images/teacher4.jpg',
        name: 'Kenji Suzuki',
        location: 'Sapporo, Japan',
        status: 'Available',
        description: 'Focuses on JLPT preparation and helps students achieve their language certification goals.',
        about: 'I specialize in JLPT test preparation, making sure my students pass with confidence.',
        testimonial: 'Kenji’s expertise in JLPT preparation is top-notch. I passed N2 after studying with him.',
        message: 'Let’s prepare for the JLPT together and achieve your goals!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-05', day: 'Saturday', time: '01:00 PM - 02:00 PM', status: 'Booked By Other' },
            { date: '2024-10-06', day: 'Sunday', time: '04:00 PM - 05:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-08', day: 'Tuesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-09', day: 'Wednesday', time: '09:00 AM - 10:00 AM', status: 'Available' }
        ]
    },
    {
        id: 5,
        image_photo_profil: 'assets/images/teacher5.jpg',
        name: 'Aiko Takahashi',
        location: 'Nagoya, Japan',
        status: 'Available',
        description: 'Specializes in teaching Japanese to children with a fun and engaging learning style.',
        about: 'I focus on teaching children Japanese in a playful and interactive way to keep them engaged.',
        testimonial: 'Aiko’s teaching style keeps my kids engaged and learning with enthusiasm.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-05', day: 'Saturday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-06', day: 'Sunday', time: '12:00 PM - 01:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-08', day: 'Tuesday', time: '04:00 PM - 05:00 PM', status: 'Available' }
        ]
    },
    {
        id: 6,
        image_photo_profil: 'assets/images/teacher6.jpg',
        name: 'Ryohei Kobayashi',
        location: 'Fukuoka, Japan',
        status: 'Available',
        description: 'Experienced in teaching Japanese to tourists and travelers, focusing on everyday communication.',
        about: 'I help tourists and travelers improve their everyday Japanese communication skills with ease.',
        testimonial: 'Ryohei’s classes were so helpful before my trip to Japan. I could navigate with confidence!',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '03:00 PM - 04:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '10:00 AM - 11:00 AM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-09', day: 'Wednesday', time: '04:00 PM - 05:00 PM', status: 'Available' }
        ]
    },
    {
        id: 7,
        image_photo_profil: 'assets/images/teacher7.jpg',
        name: 'Mai Shimizu',
        location: 'Hiroshima, Japan',
        status: 'Not Available',
        description: 'Offers classes in Japanese culture and etiquette alongside language lessons.',
        about: 'My classes focus on both the Japanese language and the rich culture and etiquette of Japan.',
        testimonial: 'Mai’s lessons are unique because she intertwines culture with language learning. Highly recommended.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '12:00 PM - 01:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'Available' }
        ]
    },
    {
        id: 8,
        image_photo_profil: 'assets/images/teacher8.jpg',
        name: 'Taro Fujimoto',
        location: 'Yokohama, Japan',
        status: 'Available',
        description: 'Skilled in teaching advanced Japanese, including reading and writing Kanji.',
        about: 'I help advanced learners master Kanji and complex grammatical structures in Japanese.',
        testimonial: 'Taro’s advanced classes helped me understand and write Kanji better than I ever thought possible.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '12:00 PM - 01:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '02:00 PM - 03:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '09:00 AM - 10:00 AM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '04:00 PM - 05:00 PM', status: 'Available' },
            { date: '2024-10-09', day: 'Wednesday', time: '02:00 PM - 03:00 PM', status: 'Available' },
            { date: '2024-10-10', day: 'Thursday', time: '09:00 AM - 10:00 AM', status: 'Booked By Other' }
        ]
    },
    {
        id: 9,
        image_photo_profil: 'assets/images/teacher9.jpg',
        name: 'Miki Saito',
        location: 'Kobe, Japan',
        status: 'Available',
        description: 'Bilingual in English and Japanese, focusing on personalized learning plans for each student.',
        about: 'I create customized learning plans tailored to each student’s needs and goals.',
        testimonial: 'Miki’s personalized approach helped me quickly improve my Japanese and reach my goals.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-09', day: 'Wednesday', time: '11:00 AM - 12:00 PM', status: 'Available' }
        ]
    },
    {
        id: 10,
        image_photo_profil: 'assets/images/teacher10.jpg',
        name: 'Haruki Matsuda',
        location: 'Sendai, Japan',
        status: 'Not Available',
        description: 'Experienced teacher for expatriates living in Japan, helping them adapt to the local culture.',
        about: 'I help expatriates living in Japan learn Japanese and adapt to the local culture with ease.',
        testimonial: 'Haruki’s understanding of the challenges expatriates face made the learning process smoother for me.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '01:00 PM - 02:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '03:00 PM - 04:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '09:00 AM - 10:00 AM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '04:00 PM - 05:00 PM', status: 'Available' }
        ]
    },
    {
        id: 11,
        image_photo_profil: 'assets/images/teacher11.jpg',
        name: 'Kazuko Nishimura',
        location: 'Shizuoka, Japan',
        status: 'Available',
        description: 'Focuses on teaching Japanese through multimedia, including films and songs.',
        about: 'I love using multimedia like films and songs to make language learning more fun and immersive.',
        testimonial: 'Kazuko’s multimedia approach helped me connect with Japanese culture and language on a deeper level.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '02:00 PM - 03:00 PM', status: 'Booked By Other' },
            { date: '2024-10-05', day: 'Saturday', time: '12:00 PM - 01:00 PM', status: 'Available' },
            { date: '2024-10-06', day: 'Sunday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '10:00 AM - 11:00 AM', status: 'Booked By Other' },
            { date: '2024-10-08', day: 'Tuesday', time: '09:00 AM - 10:00 AM', status: 'Available' }
        ]
    },
    {
        id: 12,
        image_photo_profil: 'assets/images/teacher12.jpeg',
        name: 'Takashi Yamashita',
        location: 'Nagano, Japan',
        status: 'Available',
        description: 'Specializes in teaching Japanese writing skills, particularly Kanji and essay composition.',
        about: 'I love helping students improve their writing skills, focusing on Kanji and essay composition.',
        testimonial: 'Takashi’s guidance improved my writing skills dramatically, especially my Kanji.',
        message: 'Let’s learn Japanese step by step. I’ll help you speak fluently in no time!',
        students: 25,
        schedule: [
            { date: '2024-10-01', day: 'Tuesday', time: '01:00 PM - 02:00 PM', status: 'Available' },
            { date: '2024-10-02', day: 'Wednesday', time: '03:00 PM - 04:00 PM', status: 'Booked By Other' },
            { date: '2024-10-03', day: 'Thursday', time: '09:00 AM - 10:00 AM', status: 'Available' },
            { date: '2024-10-04', day: 'Friday', time: '11:00 AM - 12:00 PM', status: 'Available' },
            { date: '2024-10-05', day: 'Saturday', time: '01:00 PM - 02:00 PM', status: 'Booked By Other' },
            { date: '2024-10-06', day: 'Sunday', time: '10:00 AM - 11:00 AM', status: 'Available' },
            { date: '2024-10-07', day: 'Monday', time: '02:00 PM - 03:00 PM', status: 'Available' },
            { date: '2024-10-08', day: 'Tuesday', time: '04:00 PM - 05:00 PM', status: 'Available' },
            { date: '2024-10-09', day: 'Wednesday', time: '01:00 PM - 02:00 PM', status: 'Booked By Other' }
        ]
    }
  ];

  constructor(private route: ActivatedRoute) {
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
  }

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

  dateClass = (d: Date): string => {
    
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    // Example to circle the date '2024-10-20'
    if (year == 2024) {
        console.log('hai')
      return 'highlight-date'; // Add custom CSS class to specific date
    }
    console.log('hello')
    return 'highlight-date'; // Return empty string for unmarked dates
  }

  prepareModal(slot: any, index:number): void {
    this.modalSlotIndex = index;
    this.modalSlot = slot;
    this.showBookingModal = true;  // Show the booking modal
  }

  closeBookingModal(): void {
    this.showBookingModal = false;  // Hide the booking modal
  }

  confirmBooking(): void {
    console.log('Booking confirmed', this.modalSlot);
    this.teacherDetails.schedule[this.modalSlotIndex].status = "Booked By Me"
    // this.successMessage = 'Booking confirmed successfully';
    // this.showSuccessModal = true;  // Show success modal
    this.showBookingModal = false;  // Hide the booking modal
  }

  closeModal(): void {
    this.showSuccessModal = false;  // Hide success modal
  }
}
