import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Wash, NewWash, UpdateWash } from './models/wash';
import { UserFromDb } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  restUrl = 'https://carwash-api.hermittheviking.dk/api/';

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ) { }

  public getAllUsers(): Promise<UserFromDb[]> {
    return this.http.get<UserFromDb[]>(`${this.restUrl}users`)
      .pipe(
        tap(() => console.log('UserFromDb fetched!')),
        catchError(this.handleError<UserFromDb[]>('Get user', []))
      ).toPromise();
  }

  public getUserByEmail(email: string): Promise<UserFromDb> {
    return this.http.get<UserFromDb>(`${this.restUrl}users/${encodeURIComponent(email)}`)
      .pipe(
        tap(_ => console.log(`UserFromDb fetched: ${email}`)),
        catchError(this.handleError<UserFromDb>(`Get user id=${email}`))
      ).toPromise();
  }

  public updateUser(email: string, model: UserFromDb): Promise<any> {
    return this.http.put<UserFromDb>(`${this.restUrl}users/${encodeURIComponent(email)}`, model, this.httpHeader)
      .pipe(
        tap(_ => console.log(`UserFromDb updated: ${email}`)),
        catchError(this.handleError<UserFromDb[]>('Update user'))
      ).toPromise();
  }

  public deleteUserByEmail(email: string): Promise<UserFromDb[]> {
    return this.http.delete<UserFromDb[]>(`${this.restUrl}users/${encodeURIComponent(email)}`, this.httpHeader)
      .pipe(
        tap(_ => console.log(`UserFromDb deleted: ${email}`)),
        catchError(this.handleError<UserFromDb[]>('Delete user'))
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
        catchError(this.handleError<UpdateWash>('Update wash'))
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
