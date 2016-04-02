import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Associate} from './associate';


@Component({
  selector: 'associateAdd',
  templateUrl: 'app/views/associates/associate-add.html',
  styleUrls: ['app/css/associates/associate-add.css']
})


export class AssociateAddComponent{
    associate:Associate;
    constructor(routeParams: RouteParams) {
    }

}
