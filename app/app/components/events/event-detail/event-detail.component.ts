import {Component, OnInit} from 'angular2/core';
import { RouteConfig,RouterOutlet, ROUTER_DIRECTIVES } from 'angular2/router';
import {Router, RouteParams} from 'angular2/router';

import {EventInfoComponent} from '../event-info/event-info.component';
import {EventGuestsComponent} from '../event-guests/event-guests.component';
import {EventManagersComponent} from '../event-managers/event-managers.component';
import {EventDocumentsComponent} from '../event-documents/event-documents.component';
import {EventCommentsComponent} from '../event-comments/event-comments.component';
import {Event} from '../event/event';
import {EventService} from '../services/event.service';


@Component({
    selector: 'event-detail',
    templateUrl: `app/components/events/event-detail/event-detail.html`,
    styleUrls: ['app/components/events/event-detail/styles/event-detail.css'],
    directives: [ROUTER_DIRECTIVES],
    inputs : ['event']
})
@RouteConfig([
  { path: '/generalInfo', name: 'GeneralInfo', component: EventInfoComponent, useAsDefault: true },
  { path: '/guests', name: 'Guests', component: EventGuestsComponent },
  { path: '/managers', name: 'EventManagers', component: EventManagersComponent },
  { path: '/documents', name: 'EventDocuments', component: EventDocumentsComponent },
  { path: '/comments', name: 'Comments', component: EventCommentsComponent }
])

export class EventDetailComponent {
    _Event = new Event();
    eventId:number;
    erroMsg:string;
    ngOnInit() {
      this.eventId = +this.routeParams.get('id');
      this.getEvent(this.eventId);

    }
    constructor(private routeParams: RouteParams, private _router:Router,private _EventService:EventService) {
        this.eventId = +routeParams.get('id');
    }
    isRouteActive(pRoute:String){
      let instruction = this._router.generate([pRoute]);
      return this._router.isRouteActive(instruction);
    }

    getEvent(pEvent:number){
      this._EventService.getEvent(pEvent).subscribe(
        event => this._Event = event[0],
        error => this.erroMsg = error
      )
    }
}
