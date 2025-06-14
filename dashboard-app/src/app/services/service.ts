import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SupersetTokenRequest {
  dashboardId: string;
}

interface SupersetTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private apiUrl = 'http://localhost:3000/api/guest-token'; // Replace with your Node.js backend URL

  constructor(private http: HttpClient) {}

  getToken(
    requestData: SupersetTokenRequest
  ): Observable<SupersetTokenResponse> {
    console.log(requestData);
    return this.http.post<SupersetTokenResponse>(this.apiUrl, requestData);
  }
}
