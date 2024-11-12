import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: "/job-listings", pathMatch: "full"
    },
    {
        path: 'job-listings',
        loadComponent: () => import('./job-listings/job-listings.component').then(m => m.JobListingsComponent)
    },
    {
        path: 'job-details/:entryId',
        loadComponent: () => import('./job-details/job-details.component').then(m => m.JobDetailsComponent)
    },
];
