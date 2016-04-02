import { Component,OnInit } from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,RouterOutlet } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import { EventsComponent } from './events/events.component';
import { EventDetailComponent} from './events/event-detail.component';
import { EventNewComponent} from './events/event-new.component';
import { AssociatesComponent } from './associates/associates.component';
import { AssociateDetailComponent } from './associates/associate-detail.component';
import { AssociateNewComponent} from './associates/associate-new.component';

import { GroupsComponent } from './groups/group-list.component';
import { GroupDetailComponent } from './groups/group-detail.component';

import {AccountComponent} from './managers/account.component'

@Component({
  selector: 'navbar',
  templateUrl: 'app/views/navbar.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/event/:id/...', name: 'EventDetail',  component: EventDetailComponent },
  { path: '/events', name: 'Events', component: EventsComponent, useAsDefault:true },
  { path: '/newEvent', name: 'NewEvent', component: EventNewComponent},
  { path: '/associates', name: 'Associates',  component: AssociatesComponent },
  { path: '/associate/:id', name: 'AssociateDetail',  component: AssociateDetailComponent },
  { path: '/newAssociate', name: 'NewAssociate', component: AssociateNewComponent},
  { path: '/groups', name:'Groups', component: GroupsComponent},
  { path: '/group/:id', name:'GroupDetail', component: GroupDetailComponent},
  { path: '/account', name:'Account', component: AccountComponent}


])
export class navbarComponent implements OnInit {
    isSuperUser:boolean = false;
    constructor(private _router:Router,private _cookieService:CookieService){
      let userType = this._cookieService.get("userType");
      if(userType == "s"){
        this.isSuperUser = true;
      }
    }
    ngOnInit(){}
    isRouteActive(pRoute:String){
      let instruction = this._router.generate([pRoute]);
      return this._router.isRouteActive(instruction);
    }

    logOut(){
      this._cookieService.remove("userName");
      this._cookieService.remove("password");
      this._cookieService.remove("userType");
      this._router.navigate(['LogIn']);
    }
    logoPress(){
        this._router.navigate(['Events']);
    }
}
