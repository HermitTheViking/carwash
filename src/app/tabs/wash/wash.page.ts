import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../shared/services/authentication.service';
import { RestService } from '../../shared/rest.service';
import { Wash } from '../../shared/models/wash';
import { CurrentUser } from '../../shared/models/currentuser';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit {

  washes: Wash[];
  wash: Wash;

  startWashForm: FormGroup;
  submitted = false;
  currentUser: CurrentUser = new CurrentUser();
  $authSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private restService: RestService,
    public formBuilder: FormBuilder,
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

    this.startWashForm = this.formBuilder.group(
      {
        type: ['', Validators.required]
      }
    );
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  get errorCtr() {
    return this.startWashForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.startWashForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      this.startNewWash(this.startWashForm.value['type']);
    }
  }

  getAllWashes() {
    this.restService.getAllWashes()
    .then(
      (res1: any) => {
        this.washes = res1.map(
          (res2: any) => {
            const tmp: Wash = {
              id: res2.id,
              type: res2.type,
              duration: res2.duration,
              done: res2.done
            };
            return tmp;
          }
        );
      }
    );
  }

  startNewWash(washType: number) {
    this.restService.createWash({
      email: this.currentUser.email,
      type: washType
    });
  }

  updateWashStart(startNow: boolean, abort: boolean) {
    this.restService.updateWash({
      email: this.currentUser.email,
      startNow,
      abort
    });
  }

  updateWashAbort(startNow: boolean, abort: boolean) {
    this.restService.updateWash({
      email: this.currentUser.email,
      startNow,
      abort
    });
  }
}
