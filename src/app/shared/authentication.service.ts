import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';

import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    userData: any;

    constructor(
        public afStore: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
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

    // Auth providers
    async AuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
        try {
            const result = await this.afAuth.signInWithPopup(provider);
            this.ngZone.run(() => {
                this.router.navigate(['/profile']);
            });
            this.SetUserData(result.user);
        } catch (error) {
            window.alert(error);
        }
    }

    // Store user in localStorage
    SetUserData(user: firebase.User): Promise<void> {
        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    // Sign-out
    async SignOut(): Promise<void> {
        await this.afAuth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }
}
