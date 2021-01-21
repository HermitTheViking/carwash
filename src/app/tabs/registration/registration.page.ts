import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  newUser: firebase.auth.UserCredential;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(){
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/profile']);
    }

    this.registrationForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get errorCtr() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      this.signUp(this.registrationForm.value['email'], this.registrationForm.value['password'])
    }
  }

  signUp(email: string, password: string){
    this.authService.RegisterUser(email, password)
    .then((res) => {
      this.newUser = res;
      this.authService.SendVerificationMail(res);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
