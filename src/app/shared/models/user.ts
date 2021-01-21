export interface UserFromAuth {
    uid: string;
    email: string;
    emailVerified: boolean;
    isSignedIn: boolean;
}

export interface UserFromDb {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    creditCard: string;
}
