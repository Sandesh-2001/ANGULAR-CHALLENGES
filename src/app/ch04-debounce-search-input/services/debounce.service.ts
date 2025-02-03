import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DebounceService {
  constructor(private http: HttpClient) {}

  getApiData() {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
}
