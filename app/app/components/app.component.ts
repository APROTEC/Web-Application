import {Component, OnInit} from 'angular2/core';
import { RouteConfig, RouterOutlet,ROUTER_DIRECTIVES } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import { logInComponent } from './shared/logIn/logIn.component';
import { navbarComponent } from './admin/navbar/navbar.component';
import { NavbarAssociateComponent } from './associate/navbar/navbarAssociate.component';

@Component({
    selector: 'my-app',
    template: `
      <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [CookieService]

})
@RouteConfig([
  {
    path: '/logIn',
    name: 'LogIn',
    component: logInComponent,
    useAsDefault: true
  },
  {
    path: '/admin/...',
    name: 'NavbarAdmin',
    component: navbarComponent
  },
  {
    path: '/app/...',
    name: 'NavbarAssociate',
    component: NavbarAssociateComponent
  }
])

export class AppComponent implements OnInit {
    userName :string ;
    constructor(private _cookieService:CookieService){}
    ngOnInit(){
    }
    getUserName(){
      this.userName =  this._cookieService.get("userName");
      return this.userName;
    }
    logIn(){

    }

}
