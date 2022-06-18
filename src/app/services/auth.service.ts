import { Injectable } from '@angular/core';
import { Appwrite, Models } from 'appwrite';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected appwrite: Appwrite;

  constructor() {
    this.appwrite = new Appwrite();
    this.appwrite.setEndpoint(environment.appwrite_url);
    this.appwrite.setProject(environment.appwrite_project)
  }

  logIn(email: string, password: string): Observable<Models.Session> {
    return new Observable((subscriber) => {
      this.appwrite.account.createSession(email, password)
        .then((data) => {
          subscriber.next(data);
        }).catch(() => {
          subscriber.error('');
        })
    })
  }

  logOut(): Observable<void> {
    return new Observable((subscriber) => {
      this.appwrite.account.deleteSessions()
        .then(() => {
          subscriber.next();
        }).catch(() => {
          subscriber.error();
        })
    })
  }

  getUser(): Observable<Models.User<Models.Preferences>> {
    return new Observable((subscriber) => {
      this.appwrite.account.get()
        .then((data) => {
          subscriber.next(data);
        }).catch(() => {
          subscriber.error();
        })
    })
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.appwrite.account.get()
        .then(() => {
          subscriber.next(true);
        }).catch(() => {
          subscriber.next(false);
        })
    })
  }
}
