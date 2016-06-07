import {Component, OnInit, Injector, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';

import {emailComponent} from '../../../shared/email/email.component';
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {Alert} from '../../../shared/alerts/alert.compononet';
import {Event,EventType} from '../../../shared/basics/events/event/event';
import {EventService} from '../../../services/events/event.service';
import {Associate} from '../../../shared/basics/associate/associate'

@Component({
    selector: 'eventInfo',
    templateUrl:'app/components/associate/events/event-info/event-info.html',
    styleUrls:['app/components/associate/events/event-info/styles/event-info.css'],
    directives:[emailComponent,LoadingComponent,Alert]
})

export class EventInfoComponent implements OnInit{
    isLoading = true;
    isEditing = false;
    _AssociateId:number;
    _IsAssociateConfirmed:boolean = false;
    _Event = new Event();
    eventTypes:EventType[];
    message = { message:"",typeMessage: "" };
    component = { type:"Events",
                id: +this._routeParams.get('id'),
                destinaries: ""};
    showMsg = false;
    _Associates = new Array<Associate>();

    constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService, private _CookieService:CookieService){}
    ngOnInit() {
      this._AssociateId = +this._CookieService.get("userCode");
      let params = this.injector.parent.parent.get(RouteParams);
      this._Event.codigo_evento = params.get('id');
      this.getEvent(this._Event.codigo_evento);
      this.getTypesEvents();
      this.getAssociates(this._Event.codigo_evento);
      this.getInvitedUser(this._AssociateId, this._Event.codigo_evento);
    }
    updateEventState(pIsConfirmed:boolean){
      this._IsAssociateConfirmed = pIsConfirmed;
      this.updateInvitedUser(pIsConfirmed)
    }

    //---------------------------------- Gets ------------------------------

    getEvent(pEvent:number){
      this._EventService.getInvitedEventsbyUser(this._AssociateId).toPromise().then(
        events => {
          if (events.find(event => event.codigo_evento == this._Event.codigo_evento) != null){
            this._EventService.getEvent(pEvent).retry(3).subscribe(
            event => {
              this._Event = event[0];
              this._Event.fecha_hora = this._Event.fecha_hora.substring(0,16)
              this._Event.fecha_limite_accion = this._Event.fecha_limite_accion.substring(0,16)
              this.getCountInvitedAssociates();
              this.getCountAcompanantes();
              this.getCountConfirmedAssociates();
            },error => {
              this.isLoading = false;
            },() => this.isLoading = false
          )
        }else{
          this._EventService.getConfirmedEventsbyUser(this._AssociateId).toPromise().then(
            events => {
              if (events.find(event => event.codigo_evento == this._Event.codigo_evento) != null){
                this._EventService.getEvent(pEvent).retry(3).subscribe(
                event => {
                  this._Event = event[0];
                  this._Event.fecha_hora = this._Event.fecha_hora.substring(0,16)
                  this._Event.fecha_limite_accion = this._Event.fecha_limite_accion.substring(0,16)
                  this.getCountInvitedAssociates();
                  this.getCountAcompanantes();
                  this.getCountConfirmedAssociates();
                },error => {
                  this.isLoading = false;
                },() => this.isLoading = false
              )
            }else{
              this._EventService.getFinalizedEventsbyUser(this._AssociateId).toPromise().then(
                events => {
                  if (events.find(event => event.codigo_evento == this._Event.codigo_evento) != null){
                    this._EventService.getEvent(pEvent).retry(3).subscribe(
                    event => {
                      this._Event = event[0];
                      this._Event.fecha_hora = this._Event.fecha_hora.substring(0,16)
                      this._Event.fecha_limite_accion = this._Event.fecha_limite_accion.substring(0,16)
                      this.getCountInvitedAssociates();
                      this.getCountAcompanantes();
                      this.getCountConfirmedAssociates();
                    },error => {
                      this.isLoading = false;
                    },() => this.isLoading = false
                  )
                }else{
                  this._router.navigateByUrl("app/events");
                }});
            }});
        }});
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
    getInvitedUser(pUserCode:number ,pEventCode:number){
      return this._EventService.getInvitedUser(pUserCode, pEventCode).subscribe(
        user => {
          if (user.lenght > 0 )
          this._IsAssociateConfirmed = user[0].confirmado
        },
        error => {},
        () => {}
      )
    }
    //---------------------------------- Update ------------------------------

    updateInvitedUser(pConfirmed:boolean){
      return this._EventService.updateInvitedUser(this._Event.codigo_evento, this._AssociateId,pConfirmed, 0).subscribe(
        data => {},
        error => {},
        () => {
          this.message.message = "Se han realizado los cambios con éxito";
          this.message.typeMessage = "Success"
          this.showMsg = true;
          setTimeout( () => {this.showMsg = false},5000)
        }
      )
    }
}
