import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component'; // Import the detail component

export const routes: Routes = [
    {
        path: '',
        component: MainComponent // Main landing page
    },
    {
        path: 'detail/:id',  // Detail page with dynamic teacher ID
        component: DetailComponent
    }
];
