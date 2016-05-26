import {Component, OnInit,Injector} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {EventService} from '../../services/event.service'
import {LoadingComponent} from '../../../shared/loading/loading.component';
import {Alert} from '../../../shared/alerts/alert.compononet';
import {EventDocument} from '../event-document/event-document'

@Component({
    selector: 'eventDocuments',
    templateUrl:'app/components/events/event-documents/event-document-list/event-documents.html',
    styleUrls:['app/components/events/event-documents/event-document-list/styles/event-documents.css'],
    directives:[LoadingComponent,Alert],
    providers:[EventService]
})

export class EventDocumentsComponent implements OnInit{
  _Documents: EventDocument[] = new Array<EventDocument>();
  _EventId:number;
  isLoading = true;
  message = { message:"",typeMessage: "" };
  showMsg = false;
  constructor(private _EventService:EventService, private _router:Router,private injector: Injector){}
  ngOnInit(){
    let params = this.injector.parent.parent.get(RouteParams);
    this._EventId = params.get('id');
    this.getDocuments()
  }
  getDocuments(){
    this._EventService.getDocuments(this._EventId).retry(3).subscribe(
      documents => {this._Documents = documents; console.log(documents[1])},
      error => {},
      () => {this.isLoading = false;}
    )
  }
  downloadDocument(pDocument:EventDocument){
    var link = document.createElement("a");
    //link.download = pDocument.nombre_acta;
    link.href = "http://"+pDocument.link_documento;
    link.click();
  }
  goToDocument(pDocument:EventDocument){
    this._router.navigateByUrl("app/documents/"+pDocument.codigo_evento_documento);
  }
}
