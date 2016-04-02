import {Component, OnInit} from 'angular2/core';
import { RouteConfig,RouterOutlet, ROUTER_DIRECTIVES } from 'angular2/router';
import {Router, RouteParams} from 'angular2/router';

import {EventInfoComponent} from './event-info.component';
import {EventGuestsComponent} from './event-guests.component';
import {EventManagersComponent} from './event-managers.component';
import {EventDocumentsComponent} from './event-documents.component';
import {EventCommentsComponent} from './event-comments.component';
import {IEvent} from './event';

@Component({
    selector: 'event-detail',
    templateUrl: `app/views/events/event-detail.html`,
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['app/css/events/event-detail.css'],
    inputs : ['event']
})
@RouteConfig([
  { path: '/generalInfo', name: 'GeneralInfo', component: EventInfoComponent, useAsDefault: true },
  { path: '/guests', name: 'Guests', component: EventGuestsComponent },
  { path: '/managers', name: 'Managers', component: EventManagersComponent },
  { path: '/documents', name: 'Documents', component: EventDocumentsComponent },
  { path: '/comments', name: 'Comments', component: EventCommentsComponent }
])

export class EventDetailComponent {
    event: IEvent;
    eventId:Number;
    constructor(routeParams: RouteParams, private _router:Router) {
        this.eventId = +routeParams.get('id');
    }
    isRouteActive(pRoute:String){
      let instruction = this._router.generate([pRoute]);
      return this._router.isRouteActive(instruction);
    }
}
