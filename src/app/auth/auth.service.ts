import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    token: string;
    constructor(private router: Router) {}

    signUpUser(email: string, password: string) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
            });
    }

    signInUser(email: string, password: string) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
                firebase
                    .auth()
                    .currentUser.getIdToken()
                    .then((tk: string) => {
                        this.token = tk;
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getToken() {
        firebase
            .auth()
            .currentUser.getIdToken()
            .then((tk: string) => (this.token = tk));
        return this.token;
    }

    authenticated() {
      return this.token != null;
    }

    logout() {
      firebase.auth().signOut();
      this.token = null;
    }
}
