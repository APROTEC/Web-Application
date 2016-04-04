import {Component,OnInit,Injector} from 'angular2/core';
import {GroupAddComponent} from '../groups/group-add.component';
import {AssociateAddComponent} from '../associates/associate-add.component';
import {GroupService} from '../groups/group.service';
import {Event,EventType} from './event';
import {Router, RouteParams} from 'angular2/router';
import {EventService} from './event.service';
import {Associate} from '../associates/associate'


@Component({
    selector: 'eventGuests',
    templateUrl:'app/views/events/event-guests.html',
    styleUrls:['app/css/events/event-guests.css'],
    directives:[GroupAddComponent, AssociateAddComponent],
    providers:[GroupService,EventService]

})

export class EventGuestsComponent implements OnInit{
  _Event = new Event();
  erroMsg:string;
  _Associates = new Array<Associate>();

  constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService){
    setInterval( ()=>{
       this.getAssociates(this._Event.codigo_evento);
    },1000)
  }
  ngOnInit() {
    let params = this.injector.parent.parent.get(RouteParams);
    this._Event.codigo_evento = params.get('id');
    this.getEvent(this._Event.codigo_evento);
    this.getAssociates(this._Event.codigo_evento);
  }
  getAssociates(pEvent:number){
    this._EventService.getAssociates(pEvent).subscribe(
      associates => this._Associates = associates,
      error => this.erroMsg = error
    )
  }
  getEvent(pEvent:number){
    this._EventService.getEvent(pEvent).subscribe(
      event => this._Event = event[0],
      error => this.erroMsg = error
    )
  }
  goToAssociate(pAssociate:Associate){
      this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
  }
}
