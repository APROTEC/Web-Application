import {Component, OnInit} from 'angular2/core';
import {emailComponent} from '../others/email.component';
import {Router, RouteParams} from 'angular2/router';
import {IEvent} from './event';

@Component({
    selector: 'eventInfo',
    templateUrl:'app/views/events/event-info.html',
    styleUrls:['app/css/events/event-info.css'],
    directives:[emailComponent]
})

export class EventInfoComponent {
    isEditing = false;
    _Event = new IEvent();
    constructor(private _router:Router, private _routeParams:RouteParams){

    }
    ngOnInit() {
      let id = this._routeParams.get('id');
      this._Event.name = id;
      //console.log(id);
    }
    onSubmit(){
        this.isEditing = false;
    }
    setEditing(pState:boolean){
      this.isEditing = pState;
    }
    deleteEvent(){

    }
    cancelEdit(){
      this.isEditing = false;
    }
    edit(){
      this.isEditing = true;
    }
}
