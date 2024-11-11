import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Job {
  id: string;
  url: string;
  title: string;
  content_text: string;
  date_modified: string;
  _feed_entry: {
    uuid: string;
    status: string;
    title: string;
    businessName: string;
    municipal: string;
  };
}

interface JobFeed {
  items: Job[];
  next_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobListingsService {
  apiUrl = '/api/v1/feed';
  token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJHZW9yZ2VEQE9ESU4tS29uc3VsdC5ubyIsImtpZCI6IjE3MmU3OWY2LTcxZWUtNDJiNy1hZTc1LTM3OTM0M2JiZWJkZCIsImlzcyI6Im5hdi1ubyIsImF1ZCI6ImZlZWQtYXBpLXYyIiwiaWF0IjoxNzI5MjU1NjMxLCJleHAiOm51bGx9.iWVPjNV0moSrsz4G1N2KEcB24Wiji4hY_HVNEeetdTY`;
  constructor(private http: HttpClient) { }

  getJobListings(url: string = this.apiUrl): Observable<JobFeed> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });

    return this.http.get<JobFeed>(url, { headers }).pipe(
      map(response => {
        return {
          items: response['items'],
          next_url: response['next_url']
        };
      })
    );
  }
}