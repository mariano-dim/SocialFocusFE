import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';


// Route config let's you map routes to components
const routes: Routes = [
  // map '/dashboard' to the dashboard component
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // map '/login' to the LoginComponent component
  {
    path: 'login',
    component: LoginComponent,
  },
  // map '/' to '/login' as our default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
