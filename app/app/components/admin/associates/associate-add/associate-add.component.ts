import {Component, OnInit, Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Associate} from '../../../shared/basics/associate/associate';
import {AssociatesService} from '../../../services/associates/associate.service';
import {GroupService} from '../../../services/groups/group.service';
import {EventService} from '../../../services/events/event.service';
import {DocumentsService} from '../../../services/documents/documents.service'
import {FormsService} from '../../../services/forms/form.service';
import {Alert} from '../../../shared/alerts/alert.compononet';



@Component({
  selector: 'associateAdd',
  templateUrl:'app/components/admin/associates/associate-add/associate-add.html',
  styleUrls: ['app/components/admin/associates/associate-add/styles/associate-add.css'],
  directives:[Alert],
  providers : [AssociatesService,DocumentsService,FormsService, GroupService, EventService]
})


export class AssociateAddComponent implements OnInit{
    @Input() component;
    tempAssociates : Associate[];
    _Associates : Associate[];

    associatesToAdd = new Array<Associate>();

    message = { message:"Asociados agregados con éxito",
                typeMessage: "Success" };
    showMsg = false;
    ngOnInit(){
      this.getAssociates();
    }
    constructor(routeParams: RouteParams,private _router:Router,
    private _AssociatesService:AssociatesService, private _GroupService:GroupService,private _EventService:EventService, private _DocumentService:DocumentsService,
    private _FormsService:FormsService) {}
    closeModal(){
      this.associatesToAdd = new Array<Associate>();
    }
    addAssociates(){
      if(this.component.type == "Events"){
        this.associatesToAdd.forEach(a => this.postAssociateEvent(this.component.id,a.codigo_informacion_persona));
      }else if(this.component.type == "Groups"){
        this.associatesToAdd.forEach(a => this.postAssociateGroup(this.component.id,a.codigo_informacion_persona));
      }else if(this.component.type == "Documents"){
        this.associatesToAdd.forEach(a => this.postAssociateDocument(this.component.id,a.codigo_informacion_persona));
      }else if(this.component.type == "Forms"){
        this.associatesToAdd.forEach(a => this.postAssociateForm(this.component.id,a.codigo_informacion_persona));
      }

    };

    addTempAssociate(pAssociate:Associate){
      if (!this.associatesToAdd.find(i => i.codigo_informacion_persona==pAssociate.codigo_informacion_persona)){
        this.associatesToAdd.push(pAssociate);
      }
    }
    search(pTerm:string){
      if (pTerm ==""){
          this.tempAssociates = new Array<Associate>() ;
      }else{
          this.tempAssociates = this._Associates.filter(associate => (associate.nombre+" "+associate.apellidos+" "+associate.cedula).toLowerCase().includes(pTerm.toLowerCase())).splice(0,4);
      }
    }


    //-------------------------------- getters ---------------------
    getAssociates(){
      this._AssociatesService.getAssociates().toPromise().then(associates => this._Associates = associates);
    };
    //-------------------------------- post -------------------------
    postAssociateGroup(pGroup:number,pAssociate:number){
      return this._GroupService.addAssociate(pGroup,pAssociate).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
        }
        );
    };
    postAssociateEvent(pEvent:number,pAssociate:number){
      return this._EventService.addAssociate(pEvent,pAssociate).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
        }
        );
    };
    postAssociateDocument(pDocument:number,pAssociate:number){
      return this._DocumentService.addAssociate(pDocument,pAssociate).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
        }
        );
    };
    postAssociateForm(pForm:number, pAssociate:number){
      return this._FormsService.addAssociate(pForm,pAssociate).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
        }
      )
    };

}
