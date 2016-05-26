import {Component,OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {GroupAddComponent} from '../../groups/group-add/group-add.component';
import {AssociateAddComponent} from '../../associates/associate-add/associate-add.component';
import {GroupService} from '../../groups/services/group.service';
import {Event,EventType} from '../event/event';
import {EventService} from '../services/event.service';
import {Associate} from '../../associates/associate/associate'
import {LoadingComponent} from '../../shared/loading/loading.component';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
    selector: 'eventGuests',
    templateUrl:'app/components/events/event-guests/event-guests.html',
    styleUrls:['app/components/events/event-guests/styles/event-guests.css'],
    directives:[GroupAddComponent, AssociateAddComponent,LoadingComponent,Alert],
    providers:[GroupService,EventService]

})

export class EventGuestsComponent implements OnInit{
  _Event = new Event();
  isLoading = true;
  _AssociatesInvited = new Array<Associate>();
  _AssociatesConfirmed = new Array<Associate>();
  _Associates = new Array<Associate>();
  tempAssociates = new Array<Associate>();
  isSearchEmpty = true;
  categoryValue = "0";
  searchTerm:string = "";
  message = { message:"",typeMessage: "" };
  showMsg = false;
  component = { type:"Events",
              id: this.injector.parent.parent.get(RouteParams).get('id') };

  constructor(private _router:Router, private _routeParams:RouteParams,private injector: Injector, private _EventService:EventService){
    setTimeout(() => {
      setInterval( ()=>{
         this.getAssociates(this._Event.codigo_evento);
      },1000)
    },3000)
  }
  ngOnInit() {
    let params = this.injector.parent.parent.get(RouteParams);
    this._Event.codigo_evento = params.get('id');
    this.getEvent(this._Event.codigo_evento);
    this.getInvitedAssociates(this._Event.codigo_evento);
  }

  goToAssociate(pAssociate:Associate){
      this._router.navigateByUrl("app/associate/"+pAssociate.codigo_informacion_persona);
  }
  filterSearchTerm(){
    if (this.searchTerm==""){
        this.isSearchEmpty = true;
        this.tempAssociates = this._Associates;
    }else{
      console.log(this._Associates)
        this.isSearchEmpty = false;
        this.tempAssociates = this._Associates.filter(
          associate => (associate.nombre.toLowerCase()+" "+associate.apellidos.toLowerCase()+" "+associate.cedula).includes(this.searchTerm.toLowerCase())
        );
    }
  }
  onCategoryChanged(pValue:string){
    this.categoryValue = pValue;
    this.onStateChanged()
  }
  filterCategory(){
    if (this.categoryValue === "0"){
      this._Associates = this._AssociatesInvited.concat(this._AssociatesConfirmed)
    }else if (this.categoryValue === "1"){
      this._Associates = this._AssociatesConfirmed
    }else if (this.categoryValue === "2"){
      this._Associates = this._AssociatesInvited
    }
  }
  onStateChanged(){
    this.filterCategory();
    this.filterSearchTerm();
  }
  getAssociates(pEvent:number){
    Observable.forkJoin(
      this._EventService.getInvitedAssociates(pEvent),
      this._EventService.getConfirmedAssociates(pEvent)
    ).retry(3).subscribe(
      data => {
        this._AssociatesInvited = data[0];
        this._AssociatesConfirmed = data[1];
        if (this.isSearchEmpty){this.tempAssociates = data[0].concat(data[1])}
        this.onStateChanged();
      },
      error => {},
      () => {}
    )
  }
  getInvitedAssociates(pEvent:number){
    this._EventService.getInvitedAssociates(pEvent).retry(3).subscribe(
      associates => {this._AssociatesInvited = associates; if (this.isSearchEmpty){this.tempAssociates = associates }},
      error => {},
      () => this.isLoading = false
    )
  }
  getConfirmedAssociates(pEvent:number){
    this._EventService.getConfirmedAssociates(pEvent).retry(3).subscribe(
      associates => {this._AssociatesConfirmed = associates; if (this.isSearchEmpty){this.tempAssociates = this.tempAssociates.concat(associates)  }},
      error => {},
      () => this.isLoading = false
    )
  }
  getEvent(pEvent:number){
    this._EventService.getEvent(pEvent).retry(3).subscribe(
      event => this._Event = event[0],
      error => {}
    )
  }
  deleteAssociate(pAssociate:number){
    this._EventService.deleteAssociate(this._Event.codigo_evento,pAssociate).subscribe(
      data => {},
      error => {},
      () => {
        this.message.message = "Se ha removido el asociado con éxito";
        this.message.typeMessage = "Success"
        this.showMsg = true;
        setTimeout( () => {this.showMsg = false},5000 )
      }
    )
  }

}
