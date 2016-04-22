import {Component} from 'angular2/core';
import {DocumentAddComponent} from '../../documents/document-add/document-add.component'

@Component({
    selector: 'eventDocuments',
    templateUrl:'app/components/events/event-documents/event-documents.html',
    styleUrls:['app/components/events/event-documents/styles/event-documents.css'],
    directives:[DocumentAddComponent]
})

export class EventDocumentsComponent {

}
