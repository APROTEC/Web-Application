import {Component, OnInit} from 'angular2/core';
import {IEvent} from './event';
import {EventService} from './event.service';
import {EventDetailComponent} from './event-detail.component';
import {Router, RouteParams} from 'angular2/router';
import { ROUTER_DIRECTIVES, } from 'angular2/router';


@Component({
  selector: 'events',
  templateUrl: 'app/views/events/events.html',
  styleUrls: ['app/css/events/events.css']

})


export class EventsComponent implements OnInit {
    events : IEvent[];
    tempEvents : IEvent[];
    private _selectedId:number;

    constructor(private eventService: EventService, private _router:Router){
        this.tempEvents = this.events;
    }
    getEvents() {
        this.eventService.getEvents().then(events => this.events = events).then(tempEvents => this.tempEvents = tempEvents).then(e => console.log(this.events));
    }
    ngOnInit(){
        this.getEvents();
    }
    search(term: string){
        if (term==""){
            this.tempEvents = this.events;
        }else{
            this.tempEvents = this.events.filter(event => event.name.includes(term));
        }
    }
    goToEvent(event:IEvent){
        this._router.navigate( ['EventDetail', { id: event.name }] );
    }
    createEvent(){
        this._router.navigate(['NewEvent']);
    }

}
