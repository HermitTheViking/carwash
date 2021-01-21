import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/shared/user';
import { AuthenticationService } from '../../shared/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'userprofile.page.html',
  styleUrls: ['userprofile.page.scss']
})
export class ProfilePage implements OnInit {

  currentUser: string;

  constructor(
    public authService: AuthenticationService,
    private menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    if (!this.authService.isEmailVerified) {
      window.alert('Email is not verified');
      this.router.navigate(['/register']);
    }
    this.getUserData();
  }

  getUserData() {
    const userJson = JSON.parse(localStorage.getItem('user'));
    this.currentUser = userJson['email'];
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
}
