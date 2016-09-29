import { Component,OnInit} from 'angular2/core';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,RouterOutlet } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import { isUserLoggedIn } from '../../services/logIn/login.service';
import { EventsComponent } from '../events/event-list/events.component';
import { EventDetailComponent } from '../events/event-detail/event-detail.component';
import { AssociateDetailComponent } from '../associates/associate-detail/associate-detail.component';
import { DocumentListComponent } from '../documents/document-list/document-list.component';
import {AccountComponent} from '../managers/account/account.component';


@Component({
  selector: 'navbarUser',
  templateUrl: 'app/components/associate/navbar/navbar.html',
  directives: [ROUTER_DIRECTIVES]
})
@CanActivate( (next, prev) => isUserLoggedIn())
@RouteConfig([
  { path: '/events', name: 'Events', component: EventsComponent, useAsDefault:true },
  { path: '/events/:id/...', name: 'EventDetail', component: EventDetailComponent},
  { path: '/associate', name: 'AssociateDetail', component: AssociateDetailComponent},
  { path: '/account', name:'Account', component: AccountComponent}

])
export class NavbarAssociateComponent implements OnInit {
    constructor(private _router:Router,private _cookieService:CookieService){

    }
    _UserCode:number;
    ngOnInit(){
      this._UserCode = +this._cookieService.get("userCode");
    }

    isRouteActive(pRoute:String){
      let instruction = this._router.generate([pRoute]);
      return this._router.isRouteActive(instruction);
    }

    logOut(){
      this._cookieService.remove("userName");
      this._cookieService.remove("password");
      this._cookieService.remove("userType");
      this._cookieService.remove("userCode");
      this._router.navigate(['LogIn']);
      this._cookieService.get
    }
    logoPress(){
        this._router.navigate(['Events']);
    }
}
