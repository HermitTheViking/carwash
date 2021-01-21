import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';

import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/currentuser';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    user$: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(new CurrentUser());

    constructor(
        public afStore: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                JSON.parse(localStorage.getItem('user'));
                const theUser = new CurrentUser();
                theUser.displayName = user.displayName;
                theUser.email = user.email;
                this.user$.next(theUser);
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Login in with email/password
    async SignIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return await this.afAuth.signInWithEmailAndPassword(email, password);
    }

    // Register user with email/password
    RegisterUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    // Email verification when new user register
    async SendVerificationMail(currentUser: firebase.auth.UserCredential): Promise<void> {
        await currentUser.user.sendEmailVerification();
    }

    // Recover password
    async PasswordRecover(passwordResetEmail: string): Promise<void> {
        try {
            await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
            window.alert('Password reset email has been sent, please check your inbox.');
        } catch (error) {
            window.alert(error);
        }
    }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
    }

    // Sign-out
    async SignOut(): Promise<void> {
        localStorage.removeItem('user');
        await this.afAuth.signOut();
        this.router.navigate(['/login']);
    }

    // Store user in localStorage
    SetUserData(user: firebase.User): Promise<void> {
        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
        const userData: CurrentUser = {
            email: user.email,
            displayName: user.displayName
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    getUserobservable(): Observable<CurrentUser> {
        return this.user$.asObservable();
    }

    getToken(): string {
        return JSON.parse(localStorage.getItem('user'))['stsTokenManager']['accessToken'];
    }
}
