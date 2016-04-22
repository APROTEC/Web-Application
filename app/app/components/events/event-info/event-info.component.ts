import {Component, OnInit, Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {emailComponent} from '../../shared/email/email.component';
import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';

@Component({
    selector: 'eventInfo',
    templateUrl:'app/components/events/event-info/event-info.html',
    styleUrls:['app/components/events/event-info/styles/event-info.css'],
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
    onSubmitEventData(){
        this.isEditing = false;
        this.updateEvent(this._Event);
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

    //---------------------------------- Events ------------------------------

    getEvent(pEvent:number){
      this._EventService.getEvent(pEvent).subscribe(
        event => {this._Event = event[0]; console.log(this._Event.fecha_hora);this._Event.fecha_hora = this._Event.fecha_hora.substring(0,16) },
        error => this.erroMsg = error
      )
    }
    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.erroMsg = <any>error);
    }
    //---------------------------------- Update ------------------------------
    updateEvent(pEvent:Event){
      this._EventService.updateEvent(pEvent.codigo_evento,pEvent.nombre,pEvent.lugar,pEvent.fecha_hora,pEvent.numero_maximo_acompanantes,pEvent.descripcion).subscribe(
        event => {},
        error => {}
      )
    }

}
