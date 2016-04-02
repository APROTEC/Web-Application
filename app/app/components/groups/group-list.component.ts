import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group'
import {GroupNewComponent} from './group-new.component';

@Component({
  selector: 'groups',
  templateUrl: 'app/views/groups/group-list.html',
  styleUrls:['app/css/groups/group-list.css'],
  directives:[GroupNewComponent]

})


export class GroupsComponent{
    constructor( private _router:Router){

    }
    goToGroup(){
        this._router.navigate( ['GroupDetail', { id: "daniel" }] );
    }
    createGroup(){
        this._router.navigate(['NewGroup']);
    }

}
