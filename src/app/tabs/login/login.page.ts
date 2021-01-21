import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { CurrentUser } from '../../shared/models/currentuser';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  currentUser: CurrentUser = new CurrentUser();
  $authSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.$authSubscription = this.authService.user$.subscribe(u => {
      this.currentUser = u;
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/profile']);
    }

    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get errorCtr() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      this.logIn(this.loginForm.value['email'], this.loginForm.value['password']);
    }
  }

  logIn(email: string, password: string) {
    this.authService.SignIn(email, password)
      .then(() => {
        this.router.navigate(['/profile']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
