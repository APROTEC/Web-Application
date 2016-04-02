import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';


@Component({
  selector: 'groupNew',
  templateUrl: 'app/views/groups/group-new.html'
})


export class GroupNewComponent{
    group:Group;
    groupId:Number;
    constructor(routeParams: RouteParams) {
        this.groupId = +routeParams.get('id');
    }

}
