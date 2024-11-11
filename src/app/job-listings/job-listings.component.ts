import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { JobListingsService } from '../core/services/job-listing.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListingsComponent implements OnInit {
  jobListings: any[] = [];

  jobListingsService = inject(JobListingsService);
  nextUrl: string | null = this.jobListingsService.apiUrl;

  constructor() { }

  ngOnInit(): void {
    this.loadJobListings(this.nextUrl || '');
  }

  loadJobListings(url: string = ''): void {
    this.jobListingsService.getJobListings(url).subscribe(data => {
      this.jobListings = this.jobListings.concat(data.items);
      this.nextUrl = data.next_url || null;
    });
  }

  loadMore(): void {
    if (this.nextUrl) {
      this.loadJobListings(this.nextUrl);
    }
  }
}
