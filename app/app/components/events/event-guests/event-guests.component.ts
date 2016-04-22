import {Component,OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {GroupAddComponent} from '../../groups/group-add/group-add.component';
import {AssociateAddComponent} from '../../associates/associate-add/associate-add.component';
import {GroupService} from '../../groups/services/group.service';
import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';
import {Associate} from '../../associates/associate/associate'


@Component({
    selector: 'eventGuests',
    templateUrl:'app/components/events/event-guests/event-guests.html',
    styleUrls:['app/components/events/event-guests/styles/event-guests.css'],
    directives:[GroupAddComponent, AssociateAddComponent],
    providers:[GroupService,EventService]

})

export class EventGuestsComponent implements OnInit{
  _Event = new Event();
  erroMsg:string;
  _Associates = new Array<Associate>();
  tempAssociates = new Array<Associate>();
  isSearchEmpty = true;
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

  goToAssociate(pAssociate:Associate){
      this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
  }
  search(term: string){
    if (term==""){
        this.isSearchEmpty = true;
        this.tempAssociates = this._Associates;
    }else{
        this.isSearchEmpty = false;
        this.tempAssociates = this._Associates.filter(
          associate => (associate.nombre.toLowerCase()+associate.apellidos.toLowerCase()).includes(term)
        );
    }
  }


  getAssociates(pEvent:number){
    this._EventService.getAssociates(pEvent).subscribe(
      associates => {this._Associates = associates; if (this.isSearchEmpty){this.tempAssociates = associates}},
      error => this.erroMsg = error
    )
  }
  getEvent(pEvent:number){
    this._EventService.getEvent(pEvent).subscribe(
      event => this._Event = event[0],
      error => this.erroMsg = error
    )
  }

}
