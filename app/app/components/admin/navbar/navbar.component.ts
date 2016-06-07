import { Component,OnInit} from 'angular2/core';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,RouterOutlet } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

import { isAdminLoggedIn } from '../../services/logIn/login.service';
import { EventsComponent } from '../events/event-list/events.component';
import { EventDetailComponent} from '../events/event-detail/event-detail.component';
import { EventNewComponent} from '../events/event-new/event-new.component';
import { AssociatesComponent } from '../associates/associate-list/associates.component';
import { AssociateDetailComponent } from '../associates/associate-detail/associate-detail.component';
import { AssociateNewComponent} from '../associates/associate-new/associate-new.component';

import { GroupsComponent } from '../groups/group-list/group-list.component';
import { GroupDetailComponent } from '../groups/group-detail/group-detail.component';

import {AccountComponent} from '../managers/account/account.component';
import {ManagersComponent} from '../managers/manager-list/manager-list.component';
import {DocumentList} from '../documents/document-list/document-list.component';
import {DocumentDetail} from '../documents/document-detail/document-detail.component';

import {FormList} from '../forms/form-list/form-list.component';
import {FormDetail} from '../forms/form-detail/form-detail.component';


@Component({
  selector: 'navbar',
  templateUrl: 'app/components/admin/navbar/navbar.html',
  directives: [ROUTER_DIRECTIVES]
})
@CanActivate( (next, prev) => isAdminLoggedIn())
@RouteConfig([
  { path: '/event/:id/...', name: 'EventDetail',  component: EventDetailComponent },
  { path: '/events', name: 'Events', component: EventsComponent, useAsDefault:true },
  { path: '/newEvent', name: 'NewEvent', component: EventNewComponent},
  { path: '/associates', name: 'Associates',  component: AssociatesComponent },
  { path: '/associate/:id', name: 'AssociateDetail',  component: AssociateDetailComponent },
  { path: '/newAssociate', name: 'NewAssociate', component: AssociateNewComponent},
  { path: '/groups', name:'Groups', component: GroupsComponent},
  { path: '/group/:id', name:'GroupDetail', component: GroupDetailComponent},
  { path: '/account', name:'Account', component: AccountComponent},
  { path: '/managers', name:'Managers', component: ManagersComponent},
  { path: '/documents', name:'Documents', component: DocumentList},
  { path: '/documents/:id', name:'DocumentsDetail', component: DocumentDetail},
  { path: '/forms', name:'Forms', component: FormList},
  { path: '/forms/:id', name:'FormDetail', component: FormDetail}


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
