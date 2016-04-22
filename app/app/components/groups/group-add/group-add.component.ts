import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams,Location} from 'angular2/router';

import {Group} from '../group/group';
import {GroupService} from '../services/group.service'
import {EventService} from '../../events/services/event.service';
import {Alert} from '../../shared/alerts/alert.compononet';


@Component({
  selector: 'groupAdd',
  templateUrl: 'app/components/groups/group-add/group-add.html',
  inputs : ['group'],
  directives:[Alert],
  providers:[GroupService]
})


export class GroupAddComponent implements OnInit{
    eventId:number=0;
    _Groups;
    groupState = new Array<boolean>();
    errorMsg:string;
    message = { message:"Los asociados han sido agregados",
                typeMessage: "Success" };
    showMsg = false;
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
      this.showMsg = true;
      setTimeout( ()=>   {this.showMsg = false},5000 )
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
