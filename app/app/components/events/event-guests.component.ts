import {Component} from 'angular2/core';
import {GroupAddComponent} from '../groups/group-add.component';
import {AssociateAddComponent} from '../associates/associate-add.component';

@Component({
    selector: 'eventGuests',
    templateUrl:'app/views/events/event-guests.html',
    styleUrls:['app/css/events/event-guests.css'],
    directives:[GroupAddComponent, AssociateAddComponent]
})

export class EventGuestsComponent {

}
