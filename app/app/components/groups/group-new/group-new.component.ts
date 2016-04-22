import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from '../group/group';
import {GroupService} from '../services/group.service';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
  selector: 'groupNew',
  templateUrl: 'app/components/groups/group-new/group-new.html',
  directives:[Alert]
})


export class GroupNewComponent{
    group:Group;
    groupId:Number;
    newGroup:Group = new Group();
    errorMsg :string;
    message = { message:"Grupo creado con éxito",
                typeMessage: "Success" };
    showMsg = false;
    constructor(private routeParams: RouteParams, private _GroupService:GroupService, private _router:Router) {
        this.groupId = +routeParams.get('id');
    }
    onCreateGroup(){
      this._GroupService.createGroup(this.newGroup.descripcion_grupo).subscribe(
        group => {},
        error => this.errorMsg = error
      );
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false},5000 )
    }

}
