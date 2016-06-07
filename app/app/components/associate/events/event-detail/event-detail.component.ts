import {Component, OnInit, Input} from 'angular2/core';
import { RouteConfig,RouterOutlet, ROUTER_DIRECTIVES } from 'angular2/router';
import {Router, RouteParams} from 'angular2/router';

import {Event} from '../../../shared/basics/events/event/event';
import {EventService} from '../../../services/events/event.service';
import {EventInfoComponent} from '../event-info/event-info.component';
import {EventDocumentsComponent} from '../event-documents/event-document-list/event-documents.component';
import {EventCommentsComponent} from '../event-comments/event-comments.component';



@Component({
    selector: 'event-detail',
    templateUrl: `app/components/associate/events/event-detail/event-detail.html`,
    styleUrls: ['app/components/associate/events/event-detail/styles/event-detail.css'],
    directives: [ROUTER_DIRECTIVES],
    providers : [EventService],
    inputs : ['event']
})
@RouteConfig([
  { path: '/generalInfo', name: 'GeneralInfo', component: EventInfoComponent, useAsDefault: true },
  { path: '/documents', name: 'EventDocuments', component: EventDocumentsComponent },
  { path: '/comments', name: 'EventComments', component: EventCommentsComponent }
])

export class EventDetailComponent {
    _Event = new Event();
    eventId:number;
    erroMsg:string;
    _Comments= new Array();
    ngOnInit() {
      this.eventId = +this.routeParams.get('id');
      this.getEvent(this.eventId);
      this.getComments()
    }
    constructor(private routeParams: RouteParams, private _router:Router,private _EventService:EventService) {
        this.eventId = +routeParams.get('id');
    }
    isRouteActive(pRoute:String){
      let instruction = this._router.generate([pRoute]);
      return this._router.isRouteActive(instruction);
    }

    getEvent(pEvent:number){
      this._EventService.getEvent(pEvent).retry(3).subscribe(
        event => this._Event = event[0],
        error => this.erroMsg = error
      )
    }
    getComments(){
      this._EventService.getComments(this.eventId).retry(3).subscribe(
        comments => { this._Comments = comments;},
        error => {},
        () => {}
      );
    }
}
