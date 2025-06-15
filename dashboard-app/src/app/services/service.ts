import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

interface SupersetTokenRequest {
  dashboardId: string;
  source?: string;
}

interface SupersetTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getToken(
    requestData: SupersetTokenRequest
  ): Observable<SupersetTokenResponse> {
    return this.http.post<SupersetTokenResponse>(this.apiUrl, requestData);
  }
}
