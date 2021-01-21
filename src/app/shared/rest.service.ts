import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Wash, NewWash, UpdateWash } from './wash';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  restUrl = 'https://localhost:5001/api/';

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  public getAllUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${this.restUrl}users`)
      .pipe(
        tap(() => console.log('User fetched!')),
        catchError(this.handleError<User[]>('Get user', []))
      ).toPromise();
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.http.get<User>(`${this.restUrl}users/${encodeURIComponent(email)}`)
      .pipe(
        tap(_ => console.log(`User fetched: ${email}`)),
        catchError(this.handleError<User>(`Get user id=${email}`))
      ).toPromise();
  }

  public updateUser(email: string, model: User): Promise<any> {
    return this.http.put<User>(`${this.restUrl}users/${encodeURIComponent(email)}`, model, this.httpHeader)
      .pipe(
        tap(_ => console.log(`User updated: ${email}`)),
        catchError(this.handleError<User[]>('Update user'))
      ).toPromise();
  }

  public deleteUserByEmail(email: string): Promise<User[]> {
    return this.http.delete<User[]>(`${this.restUrl}users/${encodeURIComponent(email)}`, this.httpHeader)
      .pipe(
        tap(_ => console.log(`User deleted: ${email}`)),
        catchError(this.handleError<User[]>('Delete user'))
      ).toPromise();
  }

  public getAllWashes(): Promise<Wash[]> {
    return this.http.get<Wash[]>(`${this.restUrl}washes`)
      .pipe(
        tap(() => console.log('Wash fetched!')),
        catchError(this.handleError<Wash[]>('Get wash', []))
      ).toPromise();
  }

  public createWash(model: NewWash): Promise<any> {
    return this.http.post<NewWash>(`${this.restUrl}washes`, model, this.httpHeader)
      .pipe(
        tap(() => console.log('Wash created!')),
        catchError(this.handleError<NewWash>('Create wash'))
      ).toPromise();
  }

  public updateWash(model: UpdateWash): Promise<any> {
    return this.http.put<UpdateWash>(`${this.restUrl}washes`, model, this.httpHeader)
      .pipe(
        tap(_ => console.log('Wash updated')),
        catchError(this.handleError<User[]>('Update wash'))
      ).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
