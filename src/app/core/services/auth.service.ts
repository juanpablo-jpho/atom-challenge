import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';


const API_URL = `${environment.apiUrl}/users`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  checkUserExists(email: string): Promise<boolean> {
    return firstValueFrom(
      this.http.get(`${API_URL}/${email}`, { observe: 'response' })
    )
      .then(() => true)
      .catch((err) => {
        if (err.status === 404) return false;
        throw err;
      });
  }

  async login(email: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<{ token: string }>(API_URL, { email })
    );
    localStorage.setItem(this.tokenKey, res.token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}