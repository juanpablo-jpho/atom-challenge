import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const mockToken = 'test-token';
  const API_URL = `${environment.apiUrl}/users`;
  const tokenKey = 'auth_token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call API_URL and store the token', fakeAsync(() => {
    const email = 'test@example.com';
  
    service.login(email); // dispara el POST
    const req = httpMock.expectOne(API_URL);
    req.flush({ token: mockToken });
  
    tick();
  
    expect(localStorage.getItem(tokenKey)).toBe(mockToken);
  }));

  it('should return token from localStorage', () => {
    localStorage.setItem(tokenKey, mockToken);
    const token = service.getToken();

    expect(token).toBe(mockToken);
  });

  it('should return null if token not in localStorage', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should remove token on logout', () => {
    localStorage.setItem(tokenKey, mockToken);
    service.logout();

    expect(localStorage.getItem(tokenKey)).toBeNull();
  });

});