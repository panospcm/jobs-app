import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobListingsService } from '../core/services/job-listing.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent implements OnInit {
  jobDetails: any; // Variable to hold job details
  entryId: string | null = null; // Variable to hold the entry ID
  route = inject(ActivatedRoute);
  jobListingsService = inject(JobListingsService);
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    if (!this.jobListingsService.currentJob().title) {
      this.router.navigate(['/job-listings']);
    }
    // Get the entry ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.entryId = params.get('entryId');
      if (this.entryId) {
        this.loadJobDetails(this.entryId);
      }
    });
  }

  loadJobDetails(entryId: string): void {
    this.jobListingsService.getJobDetails(entryId).subscribe(data => {
      this.jobDetails = data; // Assign the response data to jobDetails
    });
  }
}
