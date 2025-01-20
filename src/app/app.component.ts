import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleScrollingService } from './shared/services/title-scrolling.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private titleService: TitleScrollingService){

  }
  // title = 'class_gojp';
}
