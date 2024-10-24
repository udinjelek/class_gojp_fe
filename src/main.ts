import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Import the new HttpClient provider
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),  // Use the new HttpClient provider
    ...appConfig.providers // Ensure other providers from appConfig are included
  ]
}).catch((err) => console.error(err));
