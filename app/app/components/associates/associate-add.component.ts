import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Associate} from './associate';
import {AssociatesService} from './associate.service';
import {GroupService} from '../groups/group.service';
import {EventService} from '../events/event.service';
import {Location} from "angular2/router";


@Component({
  selector: 'associateAdd',
  templateUrl: 'app/views/associates/associate-add.html',
  styleUrls: ['app/css/associates/associate-add.css'],
  providers : [AssociatesService]
})


export class AssociateAddComponent implements OnInit{
    tempAssociates : Associate[];
    _Associates : Associate[];

    associatesToAdd = new Array<Associate>();

    groupId:number=0;
    eventId:number=0;
    isGroup = false;
    isEvent = false;
    errorMsg :string ;

    ngOnInit(){
      this.getAssociates();
    }
    constructor(routeParams: RouteParams,private _router:Router, private _AssociatesService:AssociatesService, private _GroupService:GroupService
    ,private _EventService:EventService,private location:Location) {
      if(_router.hostComponent.name == "GroupDetailComponent"){
         this.groupId = +routeParams.get('id');
         this.isGroup = true;
      }else{
        let tempLocation = location.path().substr(11);
        tempLocation = tempLocation.substr(0,tempLocation.indexOf('/'))
        this.eventId = +tempLocation
        this.isEvent = true;
      }
    }
    addAssociates(){
      if(this.isGroup){
        console.log("grupo")
        this.associatesToAdd.forEach(a => this.postAssociateGroup(this.groupId,a.codigo_informacion_persona));
        this._router.navigateByUrl("http://localhost:3000/app/group/"+this.groupId);
      }else{
        console.log("evento")
        this.associatesToAdd.forEach(a => this.postAssociateEvent(this.eventId,a.codigo_informacion_persona));
        //this._router.navigateByUrl("http://localhost:3000/app/event/"+this.groupId);
      }
    }
    addTempAssociate(pAssociate:Associate){
      if (!this.associatesToAdd.find(i => i.codigo_informacion_persona==pAssociate.codigo_informacion_persona)){
        this.associatesToAdd.push(pAssociate);
      }

    }
    search(pTerm:string){
      if (pTerm ==""){
          this.tempAssociates = new Array<Associate>() ;
      }else{
          this.tempAssociates = this._Associates.filter(associate => associate.nombre.toLowerCase().startsWith(pTerm.toLowerCase())).splice(0,3);
      }
    }


    //-------------------------------- getters ---------------------
    getAssociates(){
      this._AssociatesService.getAssociates().toPromise().then(associates => this._Associates = associates);
    }
    //-------------------------------- post -------------------------
    postAssociateGroup(pGroup:number,pAssociate:number){
      return this._GroupService.addAssociate(pGroup,pAssociate).subscribe(
        data =>console.log(""),
        error => this.errorMsg = error
        );
    }
    postAssociateEvent(pEvent:number,pAssociate:number){
      return this._EventService.addAssociate(pEvent,pAssociate).subscribe(
        data =>console.log(""),
        error => this.errorMsg = error
        );
    }

}
