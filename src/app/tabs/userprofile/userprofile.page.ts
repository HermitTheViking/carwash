import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { CurrentUser } from '../../shared/models/currentuser';

@Component({
  selector: 'app-profile',
  templateUrl: 'userprofile.page.html',
  styleUrls: ['userprofile.page.scss']
})
export class ProfilePage implements OnInit {

  currentUser: CurrentUser = new CurrentUser();
  $authSubscription: Subscription;

  constructor(
    public authService: AuthenticationService,
    private menu: MenuController,
    private router: Router
  ) {
    this.$authSubscription = this.authService.user$.subscribe(u => {
      this.currentUser = u;
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    if (!this.authService.isEmailVerified) {
      window.alert('Email is not verified');
      this.router.navigate(['/register']);
    }
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
}
