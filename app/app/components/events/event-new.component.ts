import {Component} from 'angular2/core';
import {IEvent} from './event';

@Component({
    selector: 'eventNew',
    templateUrl:'app/views/events/event-new.html',
    styleUrls:['app/css/events/event-new.css']
})

export class EventNewComponent {
    _Event = new IEvent();
    invitedGroup:string;
    onSubmit(){
      console.log(this._Event.name);
    }
}
