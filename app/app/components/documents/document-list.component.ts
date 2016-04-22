import { Component,OnInit} from 'angular2/core';
import {DocumentAddComponent} from './document-add/document-add.component'

@Component({
  selector: 'document-list',
  templateUrl: 'app/components/documents/document-list.html',
  styleUrls:['app/components/documents/styles/document-list.css'],
  directives:[DocumentAddComponent]

})

export class DocumentList{

}
