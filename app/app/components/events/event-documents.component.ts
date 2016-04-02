import {Component} from 'angular2/core';
import {DocumentAddComponent} from './document-add.component'

@Component({
    selector: 'eventDocuments',
    templateUrl:'app/views/events/event-documents.html',
    styleUrls:['app/css/events/event-documents.css'],
    directives:[DocumentAddComponent]
})

export class EventDocumentsComponent {

}
