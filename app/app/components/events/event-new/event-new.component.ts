import {Component,OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {Alert} from '../../shared/alerts/alert.compononet';

@Component({
    selector: 'eventNew',
    templateUrl:'app/components/events/event-new/event-new.html',
    styleUrls:['app/components/events/event-new/styles/event-new.css'],
    directives:[Alert]

})

export class EventNewComponent implements OnInit {
    _Event = new Event();
    invitedGroup:string;
    eventTypes:EventType[];
    errorMessage:string;
    message = { message:"El evento ha sido creado con éxito",
                typeMessage: "Success" };
    showMsg = false;
    ngOnInit(){
        this.getTypesEvents();
    }
    constructor(private _EventService: EventService, private _router:Router){ }

    onCreateEvent(){
      this._Event.fecha_hora = this._Event.fecha_hora.replace("T"," ");
      this._Event.fecha_hora = this._Event.fecha_hora+":00";
      this._EventService.createEvent(this._Event.nombre,this._Event.lugar,this._Event.fecha_hora,this._Event.numero_maximo_acompanantes,this._Event.descripcion,1)
      .subscribe(
        event => console.log(event),
        error => this.errorMessage = error
      );
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false; this._router.navigate(['Events']);},3000 )

    }

    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error =>  this.errorMessage = <any>error);
    }
}
