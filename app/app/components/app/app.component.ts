import {Component, OnInit} from 'angular2/core';
import { RouteConfig, RouterOutlet,ROUTER_DIRECTIVES } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import { logInComponent } from '../logIn/logIn.component';
import { navbarComponent } from '../navbar/navbar.component';
import { EventsComponent } from '../events/event-list/events.component';
import { EventService } from '../events/services/event.service';
import { EventDetailComponent } from '../events/event-detail/event-detail.component';

@Component({
    selector: 'my-app',
    template: `
      <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [CookieService, EventService]

})
@RouteConfig([
  {
    path: '/logIn',
    name: 'LogIn',
    component: logInComponent,
    useAsDefault: true
  },
  {
    path: '/app/...',
    name: 'Navbar',
    component: navbarComponent
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
