import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';


@Component({
  selector: 'groupAdd',
  templateUrl: 'app/views/groups/group-add.html'
})


export class GroupAddComponent{
    group:Group;
    groupId:Number;
    constructor(routeParams: RouteParams) {
        this.groupId = +routeParams.get('id');
    }

}
