import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { JobListingsService } from '../core/services/job-listing.service';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../core/models/job';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.scss',
})
export class JobListingsComponent implements OnInit {
  jobListings = signal<Job[]>([]); // Signal for job listings
  nextUrl = signal<string | null>(null); // Signal for the next URL
  currentPage: number = 0; // Track the current page
  allJobListings: Job[] = []; // Array to hold all job listings

  itemsToLoad: number = 20; // Number of items to load each time

  jobListingsService = inject(JobListingsService);
  router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.loadJobListings();
  }

  // Load all job listings once from the API
  loadJobListings(): void {
    this.jobListingsService.getJobListings().subscribe(data => {
      this.allJobListings = data.items; // Store all job listings
      this.updateDisplayedListings(); // Update displayed listings based on current page
      this.nextUrl.set(data.next_url || null); // Update the next URL for future use, if needed
    });
  }

  // Update the displayed job listings based on the current page
  updateDisplayedListings(): void {
    const start = this.currentPage * this.itemsToLoad;
    const end = start + this.itemsToLoad;
    const newItems = this.allJobListings.slice(start, end);
    this.jobListings.update((current: Job[]) => [...current, ...newItems]); // Update the signal
  }

  // Load more items for pagination
  loadMore(): void {
    if ((this.currentPage + 1) * this.itemsToLoad < this.allJobListings.length) {
      this.currentPage++; // Increment the current page
      this.updateDisplayedListings(); // Update displayed listings
    }
  }

  goToJobDetails(entryId: string): void {
    this.jobListingsService.setCurrentJob(this.allJobListings.find(job => job.id === entryId) || {} as Job);
    this.router.navigate(['job-details', entryId]);
  }
}