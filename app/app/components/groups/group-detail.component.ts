import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {AssociateAddComponent} from '../associates/associate-add.component';


@Component({
  selector: 'groupDetail',
  templateUrl: 'app/views/groups/group-detail.html',
  inputs : ['group'],
  directives:[AssociateAddComponent]
})


export class GroupDetailComponent{
    group:Group;
    groupId:Number;
    constructor(routeParams: RouteParams) {
        this.groupId = +routeParams.get('id');
    }

}
