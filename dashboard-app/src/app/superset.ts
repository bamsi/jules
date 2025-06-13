import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define an interface for the expected token response from the backend
interface GuestTokenResponse {
  token: string;
  error?: string; // Optional error field
}

@Injectable({
  providedIn: 'root',
})
export class SupersetService {
  // This URL should point to YOUR backend service endpoint
  // For development, if Angular is on 4200 and backend on 3000,
  // you might need to configure a proxy in Angular (proxy.conf.json)
  // or ensure CORS is correctly set up on the backend.
  private backendTokenUrl = '/api/get-superset-guest-token'; // Example path

  // IMPORTANT: This key should match YOUR_ANGULAR_APP_SECRET_KEY in the backend's .env file
  // It's still better to manage this more securely in a real app (e.g., environment.ts, build variables)
  // For this example, it's hardcoded for clarity of where it's used.
  private angularAppSecretKey = 'your_secret_key_for_angular_to_backend_auth'; // <<< REPLACE WITH YOUR ACTUAL KEY

  constructor(private http: HttpClient) {}

  /**
   * Fetches a Superset guest token from the backend service.
   * @param dashboardId The UUID of the Superset dashboard.
   * @param rls An optional array of Row Level Security rules.
   * @param userAttributes Optional user attributes for the guest token.
   * @returns An Observable that emits the guest token string.
   */
  fetchGuestToken(
    dashboardId: string,
    rls: any[] = [],
    userAttributes: any = {} // e.g., { username: 'specific_guest', first_name: 'Guest', last_name: 'User' }
  ): Observable<string> {
    if (!this.angularAppSecretKey || this.angularAppSecretKey === 'your_secret_key_for_angular_to_backend_auth') {
        console.warn(
            'SupersetService: angularAppSecretKey is using a default placeholder. ' +
            'Ensure this is set to your actual secret key for backend authentication.'
        );
        // Optionally, you could prevent the call or return an error if the key is not set.
        // return throwError(() => new Error('Angular app secret key not configured.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // This Authorization header is for authenticating the Angular app
      // with YOUR backend service, not Superset directly.
      'Authorization': \`Bearer \${this.angularAppSecretKey}\`
    });

    const body = {
      dashboardId,
      rls_rules: rls, // Ensure backend expects 'rls_rules'
      user_attributes: userAttributes // Ensure backend expects 'user_attributes'
    };

    return this.http.post<GuestTokenResponse>(this.backendTokenUrl, body, { headers }).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error);
        }
        if (!response.token) {
          throw new Error('No token received from backend.');
        }
        return response.token;
      }),
      catchError(error => {
        console.error('Error fetching Superset guest token from backend:', error);
        let errorMessage = 'Failed to fetch Superset guest token. ';
        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage += \`Client-side error: \${error.error.message}\`;
        } else if (error.status === 0) {
          errorMessage += 'Network error or backend not reachable. Ensure backend is running and CORS is configured if on different origins.';
        } else {
          // Backend returned an unsuccessful response code
          errorMessage += \`Backend error (status \${error.status}): \${error.error?.error || error.message}\`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
