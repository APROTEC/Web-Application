import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {Event,EventType} from '../../../shared/basics/events/event/event';
import {EventService} from '../../../services/events/event.service';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'events',
  templateUrl: 'app/components/associate/events/event-list/events.html',
  styleUrls: ['app/components/associate/events/event-list/styles/events.css'],
  directives:[LoadingComponent],
  providers : [EventService]
})


export class EventsComponent implements OnInit {
    _InvitedEvents = new Array<Event>();
    _Confirmedevents = new Array<Event>();
    _FinalizedEvents = new Array<Event>();
    _Events = new Array<Event>();
    tempEvents = new Array<Event>();
    private _selectedId:number;
    isLoading = true;
    associateId:string;

    eventTypes:EventType[];
    errorMessage:string;
    isPedingChecked:boolean = true
    isDoneChecked:boolean = false;
    searchTerm:string = "";
    actualType:string = "Todos"
    ngOnInit(){
      this.associateId = this._CookieService.get("userCode");
      this.getInvitedEvents(+this.associateId);
      this.getConfirmedEvents(+this.associateId);
      this.getFinalizedEvents(+this.associateId);
      this.getTypesEvents();

    }
    constructor(private _EventService: EventService, private _router:Router, private _CookieService:CookieService){
    }
    onEventsPendingChanged(){
      this.isPedingChecked = !this.isPedingChecked;
      this.onStateChanged();
    }
    onEventsDoneChanged(){
      this.isDoneChecked = !this.isDoneChecked;
      this.onStateChanged();
    }
    onStateChanged(){
      this.filterDate();
      this.filterSearchTerm();
      this.filterTypeEvent();
    }
    filterDate(){
      let events = new Array();
      if (this.isPedingChecked){
        events = events.concat(this._Events.filter(event => new Date(event.fecha_hora) > new Date()));
      }
      if(this.isDoneChecked){
        events = events.concat(this._Events.filter(event => new Date(event.fecha_hora) < new Date()));
      }
      this.tempEvents = events;
    }
    filterSearchTerm(){
      if (this.searchTerm==""){
          this.tempEvents = this.tempEvents;
      }else{
          this.tempEvents = this.tempEvents.filter(event => event.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    }
    filterTypeEvent(){
      if (this.actualType != "Todos"){
        this.tempEvents = this.tempEvents.filter(event => event.tipo_evento.codigo_tipo_evento == +this.actualType)
      }
    }
    onTypeEventChanged(pType:string){
      this.actualType = pType;
      this.onStateChanged();
    }
    goToEvent(event:Event){
        this._router.navigate( ['EventDetail', { id: event.codigo_evento }] );
    }

    //------------------------------ Getters ------------------------------------
    getInvitedEvents(pUser:number) {
        this._EventService.getInvitedEventsbyUser(pUser).retry(3).subscribe(
          events => {
            this._InvitedEvents = events;
            for(let iEvent = 0; iEvent != events.length; iEvent++){
              this._InvitedEvents[iEvent].tipo_evento = new EventType()
              this._InvitedEvents[iEvent].tipo_evento.codigo_tipo_evento = events[iEvent].codigo_tipo_evento;
            }
            this._Events = this._Events.concat(this._InvitedEvents.filter(event => new Date(event.fecha_hora) > new Date()));
            this.tempEvents = this.tempEvents.concat(this._InvitedEvents.filter(event => new Date(event.fecha_hora) > new Date()));
          },
          error => this.errorMessage = error,
          ()=> {this.isLoading = false});
    }
    getConfirmedEvents(pUser:number) {
        this._EventService.getConfirmedEventsbyUser(pUser).retry(3).subscribe(
          events => {
            this._Confirmedevents = events;
            for(let iEvent = 0; iEvent != events.length; iEvent++){
              this._Confirmedevents[iEvent].tipo_evento = new EventType()
              this._Confirmedevents[iEvent].tipo_evento.codigo_tipo_evento = events[iEvent].codigo_tipo_evento;
            }
            this._Events = this._Events.concat(this._Confirmedevents.filter(event => new Date(event.fecha_hora) > new Date()));
            this.tempEvents = this.tempEvents.concat(this._Confirmedevents.filter(event => new Date(event.fecha_hora) > new Date()));
          },
          error => this.errorMessage = error,
          ()=> {this.isLoading = false});
    }
    getFinalizedEvents(pUser:number) {
        this._EventService.getFinalizedEventsbyUser(pUser).retry(3).subscribe(
          events => {
            this._FinalizedEvents = events;
            for(let iEvent = 0; iEvent != events.length; iEvent++){
              this._FinalizedEvents[iEvent].tipo_evento = new EventType()
              this._FinalizedEvents[iEvent].tipo_evento.codigo_tipo_evento = events[iEvent].codigo_tipo_evento;
            }
            this._Events = this._Events.concat(this._FinalizedEvents.filter(event => new Date(event.fecha_hora) > new Date()));
            this.tempEvents = this.tempEvents.concat(this._FinalizedEvents.filter(event => new Date(event.fecha_hora) > new Date()));
          },
          error => this.errorMessage = error,
          ()=> {this.isLoading = false});
    }

    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.errorMessage = <any>error);
    }



}
