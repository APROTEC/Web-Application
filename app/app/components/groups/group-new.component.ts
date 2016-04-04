import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service';


@Component({
  selector: 'groupNew',
  templateUrl: 'app/views/groups/group-new.html'
})


export class GroupNewComponent{
    group:Group;
    groupId:Number;
    newGroup:Group = new Group();
    errorMsg :string;
    constructor(private routeParams: RouteParams, private _GroupService:GroupService, private _router:Router) {
        this.groupId = +routeParams.get('id');
    }
    onCreateGroup(){
      this._GroupService.createGroup(this.newGroup.descripcion_grupo).subscribe(
        group => console.log,
        error => this.errorMsg = error
      );
    }
}
