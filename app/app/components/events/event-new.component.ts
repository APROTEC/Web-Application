import {Component,OnInit} from 'angular2/core';
import {Event,EventType} from './event';
import {EventService} from './event.service';
import {EventDetailComponent} from './event-detail.component';
import {Router, RouteParams} from 'angular2/router';
@Component({
    selector: 'eventNew',
    templateUrl:'app/views/events/event-new.html',
    styleUrls:['app/css/events/event-new.css']
})

export class EventNewComponent implements OnInit {
    _Event = new Event();
    invitedGroup:string;
    eventTypes:EventType[];
    errorMessage:string;
    ngOnInit(){
        this.getTypesEvents();
    }
    onSubmit(){
      this._Event.fecha_hora = this._Event.fecha_hora.replace("T"," ");
      this._Event.fecha_hora = this._Event.fecha_hora+":00";
      console.log(this._Event.nombre);
      this._EventService.createEvent(this._Event.nombre,this._Event.lugar,this._Event.fecha_hora,this._Event.numero_maximo_acompanantes,this._Event.descripcion,1)
      .subscribe(
        event => console.log(event),
        error => this.errorMessage = error
      );
    }
    constructor(private _EventService: EventService, private _router:Router){
    }

    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.errorMessage = <any>error);
    }
}
