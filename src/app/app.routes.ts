import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component'; // Import the detail component
import { MyclassComponent } from './pages/myclass/myclass.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { UserComponent } from './pages/user/user.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactComponent } from './pages/contact/contact.component';

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
    },
    {
        path: 'profile-settings',  
        component: ProfileSettingsComponent
    },
    {
        path: 'user/:id',  // Detail page with dynamic user ID
        component: UserComponent
    },
    {
        path: 'reset-password/:token',  // Detail page with dynamic user ID
        component: ResetPasswordComponent
    },
    {
        path: 'contact', 
        component: ContactComponent
    },
];
