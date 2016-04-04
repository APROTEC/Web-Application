import {Component, OnInit, Injector} from 'angular2/core';
import {emailComponent} from '../others/email.component';
import {Router, RouteParams} from 'angular2/router';
import {Event,EventType} from './event';
import {EventService} from './event.service';

@Component({
    selector: 'eventInfo',
    templateUrl:'app/views/events/event-info.html',
    styleUrls:['app/css/events/event-info.css'],
    directives:[emailComponent]
})

export class EventInfoComponent implements OnInit{
    isEditing = false;
    _Event = new Event();
    eventTypes:EventType[];
    erroMsg:string;
    constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService){}
    ngOnInit() {
      let params = this.injector.parent.parent.get(RouteParams);
      this._Event.codigo_evento = params.get('id');
      this.getEvent(this._Event.codigo_evento);
      this.getTypesEvents();
    }
    onSubmit(){
        this.isEditing = false;
    }
    setEditing(pState:boolean){
      this.isEditing = pState;
    }
    deleteEvent(){

    }
    cancelEdit(){
      this.isEditing = false;
    }
    edit(){
      this.isEditing = true;
    }
    getEvent(pEvent:number){
      this._EventService.getEvent(pEvent).subscribe(
        event => this._Event = event[0],
        error => this.erroMsg = error
      )
    }
    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.erroMsg = <any>error);
    }
}
