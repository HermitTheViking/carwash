import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../../shared/authentication.service';
import { RestService } from '../../shared/rest.service';
import { Wash } from '../../shared/wash';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit {

  washes: Wash[];
  wash: Wash;
  userEmail: string;

  constructor(
    private authService: AuthenticationService,
    private restService: RestService,
    private menu: MenuController,
    private router: Router
    ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.getUserData();
    this.getAllWashes();
  }

  getUserData() {
    const userJson = JSON.parse(localStorage.getItem('user'));
    this.userEmail = userJson.email;
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  getAllWashes() {
    this.restService.getAllWashes()
    .then(
      (res: any) => {
        this.washes = res.map(
          (res: any) => {
            const tmp: Wash = {
              id: res.id,
              type: res.type,
              duration: res.duration,
              done: res.done
            };
            return tmp;
          }
        );
      }
    );
  }

  startNewWash(washType: number, start: boolean) {
    this.restService.createWash({
      email: this.userEmail,
      type: washType,
      startNow: start
    });
  }

  updateWash(startNow: boolean, abort: boolean) {
    this.restService.updateWash({
      email: this.userEmail,
      startNow,
      abort
    });
  }
}
