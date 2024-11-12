import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Job, JobFeed } from '../models/job';



@Injectable({
  providedIn: 'root'
})
export class JobListingsService {
  private apiUrl = '/api/v1';
  private token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJHZW9yZ2VEQE9ESU4tS29uc3VsdC5ubyIsImtpZCI6IjE3MmU3OWY2LTcxZWUtNDJiNy1hZTc1LTM3OTM0M2JiZWJkZCIsImlzcyI6Im5hdi1ubyIsImF1ZCI6ImZlZWQtYXBpLXYyIiwiaWF0IjoxNzI5MjU1NjMxLCJleHAiOm51bGx9.iWVPjNV0moSrsz4G1N2KEcB24Wiji4hY_HVNEeetdTY`;
  
  currentJob = signal({} as Job);
  
  constructor(private http: HttpClient) { }

  // Fetch job listings
  getJobListings(): Observable<JobFeed> {
    const url = this.constructUrl(`/feed`); // Construct the URL
    return this.http.get<JobFeed>(url, { headers: this.createHeaders() }).pipe(
      map(response => ({
        items: response['items'],
        next_url: response['next_url']
      })),
      catchError(this.handleError) // Handle errors
    );
  }

  // Fetch job details for a specific entry
  getJobDetails(entryId: string): Observable<Job> {
    const url = this.constructUrl(`/feedentry/${entryId}`); // Construct the URL
    return this.http.get<Job>(url, { headers: this.createHeaders() }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  setCurrentJob(job: Job) {
    this.currentJob.set(job);
  }

  // Centralized method to create headers
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
  }

  // Construct full URL
  private constructUrl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}