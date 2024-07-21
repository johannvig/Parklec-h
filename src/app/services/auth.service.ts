import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get user$(): Observable<User | null> {
    return this.currentUser;
  }

  login(username: string, password: string): Observable<User> {
    const user = { id: '1', username, email: `${username}@example.com` };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.router.navigate(['/home']);
    return of(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(username: string, email: string, password: string): Observable<User> {
    const user = { id: '1', username, email };
    // Here, you would typically save the user to your backend
    return of(user);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Remplacez par votre logique de changement de mot de passe
    // Exemple fictif :
    if (currentPassword === 'old-password' && newPassword) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Mot de passe actuel invalide ou nouveau mot de passe invalide.'));
    }
  }
}
