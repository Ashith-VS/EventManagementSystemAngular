import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { BookedEventsComponent } from './pages/booked-events/booked-events.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminAllEventsComponent } from './pages/admin-all-events/admin-all-events.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'login',component:LoginComponent ,title:'Login'},
    {path:'register',component:RegisterComponent,title:'Register'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'event/:id',component:EventDetailsComponent,title:'Events'},
    {path:'bookedEvents',component:BookedEventsComponent,title:'Events'},
    {path:'dashboard',component:AdminDashboardComponent,title:'Events'},
    {path:'dashboard/all-event',component:AdminAllEventsComponent,title:'Events'},
    {path:'dashboard/:id',component:AdminDashboardComponent,title:'Events'}
];
