import {Component, OnInit,Input} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Group} from '../../../shared/basics/group/group';
import {GroupService} from '../../../services/groups/group.service'
import {EventService} from '../../../services/events/event.service';
import {Alert} from '../../../shared/alerts/alert.compononet';
import {DocumentsService} from '../../../services/documents/documents.service';
import {FormsService} from '../../../services/forms/form.service'


@Component({
  selector: 'groupAdd',
  templateUrl: 'app/components/admin/groups/group-add/group-add.html',
  inputs : ['group'],
  directives:[Alert],
  providers:[GroupService,DocumentsService, FormsService,EventService]
})


export class GroupAddComponent implements OnInit{
    @Input() component;
    _Groups;
    groupState = new Array<boolean>();
    message = { message:"Los grupos han sido agregados con éxito",
                typeMessage: "Success" };
    showMsg = false;
    ngOnInit(){
      this.getGroups();
    }
    constructor(private routeParams: RouteParams, private _GroupService:GroupService,private _EventService:EventService,private _DocumentsService:DocumentsService,
    private _FormsService:FormsService) {
    }

    addGroups(){
      if (this.component.type == "Events"){
        this._Groups.forEach(g => {this.postGroupEvent(this.component.id, g.codigo_grupo)})
      }else if(this.component.type == "Documents"){
        this._Groups.forEach(g => {this.postGroupDocument(this.component.id, g.codigo_grupo)})
      }else if(this.component.type == "Forms"){
        this._Groups.forEach(g => {this.postGroupForms(this.component.id, g.codigo_grupo)})
      }
    }
    changeState(pGroup){
      pGroup.state = !pGroup.state;
    }

    //--------------------------- Gets --------------------------
    getGroups(){
      this._GroupService.getGroups().toPromise().then(
        groups => this._Groups = groups,
        error => {}
      ).then(
        groups => this._Groups.forEach(g => g.state = false)
      )

    //---------------------------- Post----------------------------
    }
    postGroupDocument(pDocument:number,pGroup:number){
      return this._DocumentsService.addGroup(pDocument,pGroup).subscribe(
        data => {},
        error =>{},
        () => {
          this.showMsg = true;
        setTimeout( () => {this.showMsg = false},5000 )
      }
      );
    }
    postGroupEvent(pEvent:number, pGroup:number){
      return this._EventService.addGroup(pEvent, pGroup).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( () => {this.showMsg = false},5000 )
        }
      );
    }
    postGroupForms(pForm:number, pGroup:number){
      return this._FormsService.addGroup(pForm,pGroup).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( () => {this.showMsg = false},5000 )
        }
      );
    }



}
