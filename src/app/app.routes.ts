import { Routes,provideRouter } from '@angular/router';
import { HomeComponent } from './Content/home/home.component';
import { JobsComponent } from './Content/jobs/jobs.component';
import { AboutComponent } from './Content/about/about.component';
import { InternsshipsComponent } from './Content/internsships/internsships.component';
import { BlogsComponent } from './Content/blogs/blogs.component';
import { ServicesComponent } from './Content/services/services.component';
import { PoliciesComponent } from './Content/policies/policies.component';
import { WhygermanyComponent } from './Content/whygermany/whygermany.component';
import { ContactusComponent } from './Content/contactus/contactus.component';
import { JobDescriptionComponent } from './Content/job-description/job-description.component';
import { BlogDescriptionComponent } from './Content/blog-description/blog-description.component';
import { LanguageComponent } from './Content/GermanyLife/language/language.component';
import { DiscoverComponent } from './Content/GermanyLife/discover/discover.component';
import { FamilyComponent } from './Content/GermanyLife/family/family.component';
import { HousingComponent } from './Content/GermanyLife/housing/housing.component';
import { InsuranceComponent } from './Content/GermanyLife/insurance/insurance.component';
import { SettlingComponent } from './Content/GermanyLife/settling/settling.component';
import { ReviewsComponent } from './Content/reviews/reviews.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
        path: 'home', 
        component: HomeComponent,
        data: { title: 'Home - Study and Job Opportunities in Germany', description: 'Explore study and job opportunities in Germany, learn about our services and more.' }
    },
    { 
        path: 'jobs', 
        component: JobsComponent,
        data: { title: 'Jobs in Germany - Job Opportunities', description: 'Find the latest job openings in Germany and apply for your dream job today.' }
    },
    { 
        path: 'about', 
        component: AboutComponent,
        data: { title: 'About Us - Your Guide to Germany', description: 'Learn more about our company and how we help people study and find jobs in Germany.' }
    },
    { 
        path: 'internships', 
        component: InternsshipsComponent,
        data: { title: 'Internships in Germany - Internship Opportunities', description: 'Explore internship opportunities in Germany to enhance your career prospects.' }
    },
    { 
        path: 'blogs', 
        component: BlogsComponent,
        data: { title: 'Blogs - Study and Work in Germany', description: 'Read our blog to find useful information about studying and working in Germany.' }
    },
    { 
        path: 'service', 
        component: ServicesComponent,
        data: { title: 'Our Services - Study and Job Assistance', description: 'Discover the services we offer to help you succeed in studying and working in Germany.' }
    },
    { 
        path: 'privacy&policy', 
        component: PoliciesComponent,
        data: { title: 'Privacy Policy - Your Data Matters', description: 'Understand how we handle and protect your data with our privacy policy.' }
    },
    { 
        path: 'why-germany', 
        component: WhygermanyComponent,
        data: { title: 'Why Germany - Study and Work Abroad', description: 'Discover why Germany is the ideal destination for studying and working abroad.' }
    },
// Why Germany Pages
    { 
        path: 'why-germany/learning-german', 
        component: LanguageComponent,
        data: { title: 'Learn German - Language Learning Tips', description: 'Find resources and tips to learn the German language and succeed in Germany.' }
    },

    { 
        path: 'why-germany/discover-germany', 
        component: DiscoverComponent,
        data: { title: 'Discover Germany - Explore the Country', description: 'Explore Germany’s culture, history, and top attractions.' }
    },

    { 
        path: 'why-germany/family-life', 
        component: FamilyComponent,
        data: { title: 'Family Life in Germany', description: 'Discover what family life in Germany is like, including education, lifestyle, and more.' }
    },

    { 
        path: 'why-germany/housing-mobility', 
        component: HousingComponent,
        data: { title: 'Why Germany - Study and Work Abroad', description: 'Discover why Germany is the ideal destination for studying and working abroad.' }
    },

    { 
        path: 'why-germany/insurance', 
        component: InsuranceComponent,
        data: { title: 'Money & Insurance in Germany', description: 'Learn about financial management and insurance options in Germany.' }
    },

    { 
        path: 'why-germany/settling', 
        component: SettlingComponent,
        data: { title: 'Settling in Germany - A Complete Guide', description: 'Learn how to settle in Germany, from finding housing to adapting to life there.' }
    },
    { 
        path: 'contact-us', 
        component: ContactusComponent,
        data: { title: 'Contact Us - Get in Touch', description: 'Have questions? Reach out to us to learn more about our services and opportunities.' }

    },
    { 
        path: 'reviews', 
        component: ReviewsComponent,
        data: { 
            title: 'Reviews - What Our Clients Say', 
            description: 'Read what our satisfied clients have to say about our services and their experiences with us.' 
        }

    },
    {
        path: 'jobs/job-description/:jobId' , component: JobDescriptionComponent,
    },
    {
        path: 'blogs/blog-description/:blogId' , component: BlogDescriptionComponent
    }
];
