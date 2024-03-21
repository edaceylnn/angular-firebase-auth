import { Injectable, inject, signal } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@firebase/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from './user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  router = inject(Router);
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserLogin = signal<UserInterface | null | undefined>(undefined);
  newUserSignUp = signal<UserInterface | null | undefined>(undefined);
  

  // login with email and password
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      this.router.navigateByUrl('/home');
    });
    return from(promise);
  }

  // sign-up with email and password
  signup(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      this.router.navigateByUrl('/login');
    });
    return from(promise);
  }

  // logOut
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.router.navigateByUrl('/login');
    });
    return from(promise);
  }

}
