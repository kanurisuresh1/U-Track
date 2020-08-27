import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../@core/utils';
import { UserService } from '../@core/mock/users.service';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu  [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
    <ng-http-loader [backdrop]="false"
[backgroundColor]="'black'"
[debounceDelay]="100"
[extraDuration]="300"
[minDuration]="300"
[opacity]=".6"
[spinner]="spinnerStyle.skWave "></ng-http-loader>

<!-- spinner Styles : 
Different style are skChasingDots, skCubeGrid, skDoubleBounce, skRotatingPlane, skSpinnerPulse, skThreeBounce, skWanderingCubes and skWave -->

  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  spinnerStyle = Spinkit;



  // constructor(){
  //   console.log(this.menu,'my elements')
  // }
  // onItemSelection(title){
  //   if ( title === 'Logout' ) {

  //     console.log('Log out Clicked ')
  //     localStorage.removeItem("MOBILE_NUMBER");
  //     localStorage.removeItem("PASSWORD");
  //   }

  user: any;

  userMenu = [{ title: 'My Profile' }, { title: 'Logout' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private routes: Router) {

    this.menu.forEach(data => {
    })
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    })
  }

  onItemSelection(title) {
    if (title === 'Logout') {
      localStorage.setItem("USER_ID", "");
      localStorage.setItem("FIRST_NAME", "");
      localStorage.setItem("LAST_NAME", "");
      localStorage.setItem("MOBILE_CODE", "");
      localStorage.setItem("MOBILE", "");
      localStorage.setItem("PROFILE_IMAGE", "");
      localStorage.setItem("COMPNAY_LOGO", "");
      localStorage.setItem("COMPANY_NAME", "");
      localStorage.setItem("REFERRAL_CODE", "");
      localStorage.setItem("REGISTERED_ID", "");
      localStorage.setItem("USER_TYPE", "");

      // Do something on Log out
      this.routes.navigate(["login"]);
    } else if (title === 'My Profile') {
      // Do something on Profile
      this.routes.navigate(["web/myaccount/myprofile"]);
    } else if (title === 'Settings') {
      // Do something on Profile
      this.routes.navigate(["web/others/settings"]);
    }
    else if (title === 'Help') {
      // Do something on Profile
      this.routes.navigate(["web/others/help"]);
    }

  }


}

