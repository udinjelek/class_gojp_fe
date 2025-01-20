import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TitleScrollingService {

  private titleSubject = new BehaviorSubject<string>(environment.appTitle);
  title$ = this.titleSubject.asObservable();

  constructor() { 
    this.startTitleScroll();
  }
  private startTitleScroll() {
    const originalTitle = environment.appTitle;
    let scrollingText = originalTitle;
    let i = 0;

    setInterval(() => {
      if (i >= originalTitle.length) {
        i = 0; // Reset the index to start from the beginning
      }
      scrollingText = originalTitle.slice(i) + originalTitle.slice(0, i); // Create the scrolling effect
      this.titleSubject.next(scrollingText);
      document.title = scrollingText;
      i++;
    }, 200); // Adjust the speed by changing the interval
  }
}
