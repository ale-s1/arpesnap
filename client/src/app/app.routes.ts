import { Routes } from '@angular/router';
//import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './pages/home/home.component';
import { MediaComponent } from './pages/media/media.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'public',
    children: [{ path: 'media', component: MediaComponent }],
  },
];
