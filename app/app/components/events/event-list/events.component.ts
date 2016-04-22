import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';
import {EventDetailComponent} from '../event-detail/event-detail.component';


@Component({
  selector: 'events',
  templateUrl: 'app/components/events/event-list/events.html',
  styleUrls: ['app/components/events/event-list/styles/events.css']
})


export class EventsComponent implements OnInit {
    events : Event[];
    tempEvents : Event[];
    private _selectedId:number;

    eventTypes:EventType[];
    errorMessage:string;
    constructor(private _EventService: EventService, private _router:Router){
        this.tempEvents = this.events;
    }
    getEvents() {
        this._EventService.getEvents().subscribe(
          events => {this.events = events;this.tempEvents = events},
          error => this.errorMessage = error);
    }
    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.errorMessage = <any>error);
    }
    ngOnInit(){
        this.getEvents();
        this.getTypesEvents();
    }
    search(term: string){
        if (term==""){
            this.tempEvents = this.events;
        }else{
            this.tempEvents = this.events.filter(event => event.nombre.includes(term));
        }
    }
    goToEvent(event:Event){
        this._router.navigate( ['EventDetail', { id: event.codigo_evento }] );
    }
    createEvent(){
        this._router.navigate(['NewEvent']);
    }

}
