import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service'
import {Location} from "angular2/router";
import {EventService} from '../events/event.service';

@Component({
  selector: 'groupAdd',
  templateUrl: 'app/views/groups/group-add.html',
  inputs : ['group'],
  providers:[GroupService]
})


export class GroupAddComponent implements OnInit{
    eventId:number=0;
    _Groups;
    groupState = new Array<boolean>();
    errorMsg:string;
    ngOnInit(){
      this.getGroups();
    }
    constructor(private routeParams: RouteParams, private _GroupService:GroupService,private location:Location,private _EventService:EventService) {
      let tempLocation = location.path().substr(11);
      tempLocation = tempLocation.substr(0,tempLocation.indexOf('/'))
      this.eventId = +tempLocation
    }
    getGroups(){
      this._GroupService.getGroups().toPromise().then(
        groups => this._Groups = groups,
        error => this.errorMsg = error
      ).then(
        groups => this._Groups.forEach(g => g.state = false)
      )
    }
    addGroups(){
      this._Groups.forEach(g =>{
        if(g.state==true){
          this.postGroup(this.eventId,g.codigo_grupo);
        }
      });
    }
    changeState(pGroup){
      pGroup.state = !pGroup.state;
    }


    //------------ Post------------
    postGroup(pEvent:number,pGroup:number){
      return this._EventService.addGroup(pEvent,pGroup).subscribe(
        data =>console.log(""),
        error => this.errorMsg = error
        );
    }


}
