import {Component, OnInit, Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {emailComponent} from '../../shared/email/email.component';
import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Alert} from '../../shared/alerts/alert.compononet';
import {Associate} from '../../associates/associate/associate'

@Component({
    selector: 'eventInfo',
    templateUrl:'app/components/events/event-info/event-info.html',
    styleUrls:['app/components/events/event-info/styles/event-info.css'],
    directives:[emailComponent,LoadingComponent,Alert]
})

export class EventInfoComponent implements OnInit{
    isLoading = true;
    isEditing = false;
    _Event = new Event();
    eventTypes:EventType[];
    message = { message:"",typeMessage: "" };
    component = { type:"Events",
                id: +this._routeParams.get('id'),
                destinaries: ""};
    showMsg = false;
    _Associates = new Array<Associate>();

    constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService){}
    ngOnInit() {
      let params = this.injector.parent.parent.get(RouteParams);
      this._Event.codigo_evento = params.get('id');
      this.getEvent(this._Event.codigo_evento);
      this.getTypesEvents();
      this.getAssociates(this._Event.codigo_evento);


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
      this._EventService.getEvent(pEvent).retry(3).subscribe(
        event => {
          this._Event = event[0];
          this._Event.fecha_hora = this._Event.fecha_hora.substring(0,16)
          this._Event.fecha_limite_accion = this._Event.fecha_limite_accion.substring(0,16)
          this.getCountInvitedAssociates();
          this.getCountAcompanantes();
          this.getCountConfirmedAssociates();
        },
        error => {},
        () => this.isLoading = false
      )

    }
    getAssociates(pEvent:number){
      Observable.forkJoin(
        this._EventService.getInvitedAssociates(pEvent),
        this._EventService.getConfirmedAssociates(pEvent)
      ).retry(3).subscribe(
        data => {
          this._Associates = data[0].concat(data[1]);
          this._Associates.forEach(associate => {
            this.component.destinaries = this.component.destinaries.concat(associate.correo_personal+";")
          })
          this.component.destinaries = this.component.destinaries.substring(0,this.component.destinaries.length-1);
        },
        error => {},
        () => {}
      )
    }
    getTypesEvents(){
      return this._EventService.getTypesEvents().toPromise().then(
                            eventTypes=> this.eventTypes = eventTypes,
                            error => {});
    }
    getCountInvitedAssociates(){
      return this._EventService.getCountInvitedAssociates(this._Event.codigo_evento).retry(3).subscribe(
        count => {
          if (count.length != 0 )
          this._Event.noConfirmedParticipants = count[0].invitados;
        },
        error => {},
        () => {}
      )
    }
    getCountConfirmedAssociates(){
      return this._EventService.getCountConfirmedAssociates(this._Event.codigo_evento).retry(3).subscribe(
        count => {
          if (count.length != 0 )
          this._Event.confirmedParticipants = count[0].invitados;
        },
        error => {},
        () => {}
      )
    }
    getCountAcompanantes(){
      return this._EventService.getCountAcompanantes(this._Event.codigo_evento).retry(3).retry(3).subscribe(
        count => {
          if (count.length != 0 )
          this._Event.acompanantes = count[0].invitados
        },
        error => {},
        () => {}
      )
    }
    //---------------------------------- Update ------------------------------
    updateEvent(pEvent:Event){
      this._EventService.updateEvent(pEvent.codigo_evento,pEvent.nombre,pEvent.lugar,pEvent.fecha_hora+":09.000Z",pEvent.numero_maximo_acompanantes,pEvent.descripcion,
      pEvent.precio_entrada_asociados, pEvent.fecha_limite_accion+":09.000Z", pEvent.codigo_tipo_evento).subscribe(
        event => {},
        error => {},
        () => {
          this.message.message = "Se han guardado los cambios con éxito";
          this.message.typeMessage = "Success"
          this.showMsg = true;
          setTimeout( () => {this.showMsg = false},5000)
        }
      )
    }

}
