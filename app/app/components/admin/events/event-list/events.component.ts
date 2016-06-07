import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams,ROUTER_DIRECTIVES} from 'angular2/router';
import {Event,EventType} from '../../../shared/basics/events/event/event';
import {EventService} from '../../../services/events/event.service';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {LoadingComponent} from '../../../shared/loading/loading.component';


@Component({
  selector: 'events',
  templateUrl: 'app/components/admin/events/event-list/events.html',
  styleUrls: ['app/components/admin/events/event-list/styles/events.css'],
  directives:[LoadingComponent],
  providers : [EventService]
})


export class EventsComponent implements OnInit {
    events = new Array<Event>();
    tempEvents = new Array<Event>();
    private _selectedId:number;
    isLoading = true;

    eventTypes:EventType[];
    errorMessage:string;
    isPedingChecked:boolean = true
    isDoneChecked:boolean = false;
    searchTerm:string = "";
    actualType:string = "Todos"
    ngOnInit(){
        this.getEvents();
        this.getTypesEvents();

    }
    constructor(private _EventService: EventService, private _router:Router){
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
        events = events.concat(this.events.filter(event => new Date(event.fecha_hora) > new Date()));
      }
      if(this.isDoneChecked){
        events = events.concat(this.events.filter(event => new Date(event.fecha_hora) < new Date()));
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
    createEvent(){
        this._router.navigate(['NewEvent']);
    }

    //------------------------------ Getters ------------------------------------
    getEvents() {
        this._EventService.getEvents().retry(3).subscribe(
          events => {
            this.events = events;
            for(let iEvent = 0; iEvent != events.length; iEvent++){
              this.events[iEvent].tipo_evento = new EventType()
              this.events[iEvent].tipo_evento.codigo_tipo_evento = events[iEvent].codigo_tipo_evento;
            }
            this.tempEvents = this.events.filter(event => new Date(event.fecha_hora) > new Date());
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
