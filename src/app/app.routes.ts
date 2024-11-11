import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component'; // Import the detail component
import { MyclassComponent } from './pages/myclass/myclass.component';
export const routes: Routes = [
    {
        path: '',
        component: MainComponent // Main landing page
    },
    {
        path: 'detail/:id',  // Detail page with dynamic teacher ID
        component: DetailComponent
    },
    {
        path: 'my-class',  
        component: MyclassComponent
    }
];
