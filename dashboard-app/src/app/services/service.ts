import { Injectable } from '@angular/core';
import jwtEncode from 'jwt-encode';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private secret = environment.secretKey;

  generateToken(dashboardId: string): string {
    const payload = {
      user: {
        username: environment.username,
        first_name: 'Guest',
        last_name: 'User',
        roles: ['Gamma'],
      },
      resources: [
        {
          type: 'dashboard',
          id: dashboardId,
        },
      ],
      rls: [],
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 min expiration
    };

    return jwtEncode(payload, this.secret);
  }
}
