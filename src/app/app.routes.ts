import { Routes } from '@angular/router';
import { HomeComponent } from './Content/home/home.component';
import { JobsComponent } from './Content/jobs/jobs.component';
import { AboutComponent } from './Content/about/about.component';
import { InternsshipsComponent } from './Content/internsships/internsships.component';
import { BlogsComponent } from './Content/blogs/blogs.component';
import { ServicesComponent } from './Content/services/services.component';

export const routes: Routes = [
    {path : '', redirectTo:'home' , pathMatch:'full'},
    {path : 'home' , component: HomeComponent},
    {path : 'jobs' , component: JobsComponent},
    {path : 'about' , component: AboutComponent},
    {path : 'internships' , component: InternsshipsComponent},
    {path : 'blogs' , component: BlogsComponent},
    {path : 'service' , component: ServicesComponent}
];
